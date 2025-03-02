import {DropdownMenu, DropdownMenuProps, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {
    type AllPropertiesMustPresent,
    EMPTY_STRING,
    isNullOrUndefined,
    Ts,
    useComponentContext,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {ProgressStripes} from "@miniskylab/antimatter-motion-graphics";
import {NumericInputField} from "@miniskylab/antimatter-numeric-input-field";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {Text} from "@miniskylab/antimatter-text";
import {Status as ToggleStatus, Toggle} from "@miniskylab/antimatter-toggle";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {forwardRef, JSX, RefObject, useEffect, useImperativeHandle, useMemo, useRef} from "react";
import {ControlStatus, DueDateType, Mode, Status, TagMetadata, TagStatus} from "./enums";
import {type Props, type Ref, ReminderContext, TagIdContext} from "./models";
import * as Service from "./services";

export const Component = forwardRef(function Component(
    {
        style,
        id,
        mode = Mode.ReadOnly,
        name = EMPTY_STRING,
        recurrencePattern = EMPTY_STRING,
        recurrencePatternPlaceholder = EMPTY_STRING,
        secNotificationInterval,
        notificationIntervalLabel = EMPTY_STRING,
        hourNotificationIntervalPlaceholder = EMPTY_STRING,
        minuteNotificationIntervalPlaceholder = EMPTY_STRING,
        secNotificationIntervalPlaceholder = EMPTY_STRING,
        tags = {},
        maxSelectedTagCount = 2,
        isShowingProgressStripes,
        isToBeDeleted,
        status = Status.Unscheduled,
        dueDate,
        originalData,
        modifiedDate,
        createdDate,
        onPress,
        onChange
    }: Props,
    ref: RefObject<Ref>
): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, id, name, recurrencePattern, recurrencePatternPlaceholder, secNotificationInterval, notificationIntervalLabel,
        hourNotificationIntervalPlaceholder, minuteNotificationIntervalPlaceholder, secNotificationIntervalPlaceholder, tags,
        maxSelectedTagCount, isShowingProgressStripes, isToBeDeleted, status, dueDate, originalData, modifiedDate, createdDate, mode,
        onPress, onChange
    };

    const rootContainerRef = useRef<Pressable<Ref>>(null);

    const stateMachine = new Service.StateMachine({
        recurrencePattern,
        dueDate,
        mode,
        status,
        originalDueDate: originalData?.dueDate,
        originalStatus: originalData?.status
    });
    const {
        dueDuration, formattedDueDate, formattedDueDuration, isOverdue, isDue, suspenseToggleStatus, rescheduleForwardToggleStatus,
        rescheduleBackwardToggleStatus, recurrencePatternInputFieldStatus
    } = stateMachine.getDerivedProperties();
    const [
        hourNotificationIntervalTimeComponent, minuteNotificationIntervalTimeComponent, secNotificationIntervalTimeComponent
    ] = useMemo(() => Ts.Time.getTimeComponents(secNotificationInterval), [secNotificationInterval]);

    const context = useComponentContext<ReminderContext>({props, extra: {isDue, isOverdue}});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    useImperativeHandle(ref, () => ({
        flashHighlight: rootContainerRef.current?.flashHighlight,
        editModeExpandHeight: rootContainerRef.current?.editModeExpandHeight,
        alarmModeExpandHeight: rootContainerRef.current?.alarmModeExpandHeight,
        contractHeight: rootContainerRef.current?.contractHeight,
        collapseHeight: rootContainerRef.current?.collapseHeight
    }), []);

    useEffect(() =>
    {
        switch (mode)
        {
            case Mode.Dismiss:
                rootContainerRef.current?.alarmModeExpandHeight?.();
                break;

            case Mode.Edit:
            case Mode.Draft:
                rootContainerRef.current?.editModeExpandHeight?.();
                break;

            default:
                rootContainerRef.current?.contractHeight?.();
        }
    }, [mode]);

    return (
        <ReminderContext.Provider value={context}>
            <Pressable ref={rootContainerRef} style={computedStyle.Root} onPress={onPress} disabled={isToBeDeleted}>
                {isShowingProgressStripes && (<ProgressStripes style={computedStyle.ProgressStripes} msAnimationDuration={500}/>)}
                <Icon style={computedStyle.Icon} name={getReminderIcon()} pointerEvents={"none"}/>
                <View style={computedStyle.NameTagAndDueDateContainer}>
                    {renderName()}
                    {formattedDueDate && (<>
                        <Icon style={computedStyle.DueDateIcon} name={DefaultIconSet.Calendar}/>
                        <Text style={computedStyle.DueDate}>{formattedDueDate}</Text>
                    </>)}
                    {formattedDueDuration && (<>
                        <Icon style={computedStyle.DueDurationIcon} name={getDueDurationIcon()}/>
                        <Text style={computedStyle.DueDuration}>{formattedDueDuration}</Text>
                    </>)}
                    {renderTags()}
                </View>
                {(mode === Mode.Draft || mode === Mode.Edit || mode === Mode.Dismiss) && renderExpansionArea()}
            </Pressable>
        </ReminderContext.Provider>
    );

    function getReminderIcon(): DefaultIconSet
    {
        return status === Status.Completed
            ? DefaultIconSet.CheckMarkInsideCircle
            : status === Status.Suspended
                ? DefaultIconSet.Zzz
                : isOverdue
                    ? DefaultIconSet.ExclamationMarkInsideCircle
                    : isDue
                        ? DefaultIconSet.Alarm
                        : isNullOrUndefined(dueDuration)
                            ? DefaultIconSet.NoSound
                            : DefaultIconSet.Future;
    }

    function getDueDurationIcon(): DefaultIconSet
    {
        return isDue
            ? DefaultIconSet.Flag
            : isOverdue
                ? DefaultIconSet.History
                : DefaultIconSet.Future;
    }

    function getRescheduleForwardToggleIcon(): DefaultIconSet
    {
        const today = originalData?.dueDate ?? new Date();
        const nextDueDate = Service.getDueDate(originalData?.recurrencePattern, DueDateType.NextDueDate, today);
        return originalData?.status === Status.Completed || !nextDueDate || nextDueDate.getTime() <= today.getTime()
            ? DefaultIconSet.CheckMarkInsideCircle
            : DefaultIconSet.Future;
    }

    function getDropdownMenuItems(): NonNullable<DropdownMenuProps["menuItems"]>
    {
        const dropdownMenuItems: DropdownMenuProps["menuItems"] = {};
        const selectedTagCount = Object.values(tags).filter(x => x.status === TagStatus.Selected).length;
        const mutuallyExclusiveTagSelected = Object.values(tags)
            .some(x => x.metadata?.has(TagMetadata.MutuallyExclusive) && x.status === TagStatus.Selected);

        Object.keys(tags).forEach(tagId =>
        {
            const tag = tags[tagId];
            const maxSelectedTagCountReached = selectedTagCount >= maxSelectedTagCount;
            const mutuallyExclusiveTagDisabled = tag.metadata?.has(TagMetadata.MutuallyExclusive) && selectedTagCount > 0;
            const mappedMenuItemStatus = tag.status === undefined && (maxSelectedTagCountReached || mutuallyExclusiveTagSelected)
                ? MenuItemStatus.Hidden
                : tag.status === undefined && mutuallyExclusiveTagDisabled
                    ? MenuItemStatus.Disabled
                    : Ts.Enum.getValue(MenuItemStatus, Ts.Enum.getName(TagStatus, tag.status));

            const context: string[] = [];
            if (tag.metadata?.has(TagMetadata.HighlightTarget))
            {
                context.push(TagMetadata.HighlightTarget);
            }

            dropdownMenuItems[tagId] = {
                displayText: tag.name,
                status: mappedMenuItemStatus,
                context
            };
        });

        return dropdownMenuItems;
    }

    function renderName(): JSX.Element
    {
        return (
            mode === Mode.Draft || mode === Mode.Edit
                ? <InputField
                    style={computedStyle.NameInputField}
                    placeholder={"Reminder Name"}
                    value={name}
                    autoFocus={true}
                    onChangeText={onNameChange}
                />
                : <Text style={computedStyle.NameText} numberOfLines={1} pointerEvents={"none"}>{name}</Text>
        );
    }

    function renderTags(): JSX.Element
    {
        const dropdownMenuItems = getDropdownMenuItems();
        if (mode === Mode.Draft || mode === Mode.Edit)
        {
            return (
                <DropdownMenu
                    style={computedStyle.TagSelector}
                    isOpen={true}
                    menuItems={dropdownMenuItems}
                    enableMenuHorizontalScrolling={true}
                    onMenuItemPress={onTagChange}
                />
            );
        }
        else
        {
            const dropdownMenuItemValues = Object.keys(dropdownMenuItems);
            return (
                <View style={computedStyle.TagContainer} pointerEvents={"none"}>
                    {
                        [...Object.keys(tags).filter(x => tags[x].status === TagStatus.Selected)]
                            .sort((a, b) => dropdownMenuItemValues.indexOf(a) - dropdownMenuItemValues.indexOf(b))
                            .map(tagId => (
                                <TagIdContext.Provider key={tagId} value={tagId}>
                                    <Text style={computedStyle.Tag} pointerEvents={"none"}>{tags[tagId].name ?? tagId}</Text>
                                </TagIdContext.Provider>
                            ))
                    }
                </View>
            );
        }
    }

    function renderExpansionArea(): JSX.Element
    {
        return (
            <View style={computedStyle.ExpansionArea}>
                <View style={computedStyle.HrContainer}>
                    <View style={computedStyle.Hr}/>
                </View>
                {recurrencePatternInputFieldStatus !== ControlStatus.Hidden && (
                    <InputField
                        style={computedStyle.RecurrencePatternInputField}
                        placeholder={recurrencePatternPlaceholder}
                        value={recurrencePattern}
                        onChangeText={onRecurrencePatternChange}
                    />
                )}
                <Text style={computedStyle.NotificationIntervalLabel}>{notificationIntervalLabel}</Text>
                <NumericInputField
                    style={computedStyle.NotificationIntervalNumericInputField}
                    minValue={0}
                    maxValue={23}
                    maximumDigitCount={2}
                    maximumFractionDigitCount={0}
                    selectTextOnFocus={true}
                    placeholder={hourNotificationIntervalPlaceholder}
                    defaultValue={hourNotificationIntervalTimeComponent}
                    keyboardType={"number-pad"}
                    onChange={onHourNotificationIntervalTimeComponentChange}
                />
                <NumericInputField
                    style={computedStyle.NotificationIntervalNumericInputField}
                    minValue={0}
                    maxValue={59}
                    maximumDigitCount={2}
                    maximumFractionDigitCount={0}
                    selectTextOnFocus={true}
                    placeholder={minuteNotificationIntervalPlaceholder}
                    defaultValue={minuteNotificationIntervalTimeComponent}
                    keyboardType={"number-pad"}
                    onChange={onMinuteNotificationIntervalTimeComponentChange}
                />
                <NumericInputField
                    style={computedStyle.NotificationIntervalNumericInputField}
                    minValue={0}
                    maxValue={59}
                    maximumDigitCount={2}
                    maximumFractionDigitCount={0}
                    selectTextOnFocus={true}
                    placeholder={secNotificationIntervalPlaceholder}
                    defaultValue={secNotificationIntervalTimeComponent}
                    keyboardType={"number-pad"}
                    onChange={onSecNotificationIntervalTimeComponentChange}
                />
                <View style={computedStyle.NotificationIntervalControlZone}/>
                {suspenseToggleStatus !== ControlStatus.Hidden && <Toggle
                    style={computedStyle.SuspenseToggle}
                    icon={DefaultIconSet.Zzz}
                    status={suspenseToggleStatus === ControlStatus.Highlighted ? ToggleStatus.Checked : ToggleStatus.Unchecked}
                    disabled={suspenseToggleStatus === ControlStatus.Disabled}
                    onChange={onSuspenseToggleStatusChange}
                />}
                {rescheduleForwardToggleStatus !== ControlStatus.Hidden && (<Toggle
                    style={computedStyle.RescheduleForwardToggle}
                    icon={getRescheduleForwardToggleIcon()}
                    status={rescheduleForwardToggleStatus === ControlStatus.Highlighted ? ToggleStatus.Checked : ToggleStatus.Unchecked}
                    disabled={rescheduleForwardToggleStatus === ControlStatus.Disabled}
                    onChange={onRescheduleForwardToggleStatusChange}
                />)}
                {rescheduleBackwardToggleStatus !== ControlStatus.Hidden && (<Toggle
                    style={computedStyle.RescheduleBackwardToggle}
                    icon={DefaultIconSet.History}
                    status={rescheduleBackwardToggleStatus === ControlStatus.Highlighted ? ToggleStatus.Checked : ToggleStatus.Unchecked}
                    disabled={rescheduleBackwardToggleStatus === ControlStatus.Disabled}
                    onChange={onRescheduleBackwardToggleStatusChange}
                />)}
            </View>
        );
    }

    function onNameChange(newName: string): void { onChange?.({name: newName}); }

    function onTagChange(pressedTagId: string): void
    {
        const pressedTag = tags[pressedTagId];
        const pressedTagNewStatus = pressedTag.status === TagStatus.Selected
            ? undefined
            : pressedTag.status === undefined
                ? TagStatus.Selected
                : pressedTag.status;

        onChange?.({
            tags: {
                ...tags,
                [pressedTagId]: {
                    ...pressedTag,
                    status: pressedTagNewStatus,
                    order: pressedTagNewStatus === TagStatus.Selected
                        ? Object.values(tags).filter(x => x.status === TagStatus.Selected).length + 1
                        : undefined
                }
            }
        });
    }

    function onRecurrencePatternChange(newRecurrencePattern: string): void
    {
        const today = new Date();
        const newDueDate = Service.getDueDate(newRecurrencePattern, DueDateType.NextDueDate, today);
        const newStatus = newDueDate && status === Status.Unscheduled
            ? Status.Scheduled
            : !newDueDate && status === Status.Scheduled
                ? Status.Unscheduled
                : status;

        onChange?.({
            recurrencePattern: newRecurrencePattern,
            dueDate: newDueDate,
            status: newStatus
        });
    }

    function onHourNotificationIntervalTimeComponentChange(newHourNotificationIntervalTimeComponent: number | undefined): void
    {
        onChange?.({
            secNotificationInterval: Ts.Time.getSecTime(
                newHourNotificationIntervalTimeComponent,
                minuteNotificationIntervalTimeComponent,
                secNotificationIntervalTimeComponent
            ) || undefined
        });
    }

    function onMinuteNotificationIntervalTimeComponentChange(newMinuteNotificationIntervalTimeComponent: number | undefined): void
    {
        onChange?.({
            secNotificationInterval: Ts.Time.getSecTime(
                hourNotificationIntervalTimeComponent,
                newMinuteNotificationIntervalTimeComponent,
                secNotificationIntervalTimeComponent
            ) || undefined
        });
    }

    function onSecNotificationIntervalTimeComponentChange(newSecNotificationIntervalTimeComponent: number | undefined): void
    {
        onChange?.({
            secNotificationInterval: Ts.Time.getSecTime(
                hourNotificationIntervalTimeComponent,
                minuteNotificationIntervalTimeComponent,
                newSecNotificationIntervalTimeComponent
            ) || undefined
        });
    }

    function onSuspenseToggleStatusChange(newSuspenseToggleStatus: ToggleStatus): void
    {
        const newSuspenseControlStatus = newSuspenseToggleStatus === ToggleStatus.Checked
            ? ControlStatus.Highlighted
            : ControlStatus.Available;

        const {newDueDate, newStatus} = stateMachine.toggleSuspense(newSuspenseControlStatus);
        onChange?.({
            status: newStatus,
            dueDate: newDueDate
        });
    }

    function onRescheduleForwardToggleStatusChange(newRescheduleForwardToggleStatus: ToggleStatus): void
    {
        const newRescheduleForwardControlStatus = newRescheduleForwardToggleStatus === ToggleStatus.Checked
            ? ControlStatus.Highlighted
            : ControlStatus.Available;

        const {newDueDate, newStatus} = stateMachine.toggleRescheduleForward(newRescheduleForwardControlStatus);
        onChange?.({
            status: newStatus,
            dueDate: newDueDate
        });
    }

    function onRescheduleBackwardToggleStatusChange(newRescheduleBackwardToggleStatus: ToggleStatus): void
    {
        const newRescheduleBackwardControlStatus = newRescheduleBackwardToggleStatus === ToggleStatus.Checked
            ? ControlStatus.Highlighted
            : ControlStatus.Available;

        const {newDueDate, newStatus} = stateMachine.toggleRescheduleBackward(newRescheduleBackwardControlStatus);
        onChange?.({
            status: newStatus,
            dueDate: newDueDate
        });
    }
});

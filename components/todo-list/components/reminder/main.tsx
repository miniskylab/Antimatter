import {Button} from "@miniskylab/antimatter-button";
import {DropdownMenu, DropdownMenuProps, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {
    type AllPropertiesMustPresent,
    DateFormat,
    EMPTY_STRING,
    GregorianCalendar,
    isNotNullAndUndefined,
    isNullOrUndefined,
    TimeUnit,
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
import React, {forwardRef, JSX, MutableRefObject, useEffect, useImperativeHandle, useRef} from "react";
import {Mode, Status, TagMetadata, TagStatus} from "./enums";
import {type Props, type Ref, ReminderContext} from "./models";
import * as Service from "./services";

export const Component = forwardRef(function Component(
    {
        style,
        id,
        mode = Mode.ReadOnly,
        name = EMPTY_STRING,
        recurrencePattern = EMPTY_STRING,
        recurrencePatternPlaceholder = EMPTY_STRING,
        notificationInterval,
        notificationIntervalPlaceholder = EMPTY_STRING,
        tags = {},
        maxSelectedTagCount = 2,
        showProgressStripes,
        isToBeDeleted,
        status = Status.Unscheduled,
        dueDate,
        originalData,
        modifiedDate,
        createdDate,
        onPress,
        onChange
    }: Props,
    ref: MutableRefObject<Ref>
): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, id, name, recurrencePattern, recurrencePatternPlaceholder, notificationInterval, notificationIntervalPlaceholder, tags,
        maxSelectedTagCount, showProgressStripes, isToBeDeleted, status, dueDate, originalData, modifiedDate, createdDate, mode, onPress,
        onChange
    };

    const rootContainerRef = useRef<Pressable<Ref>>(null);

    const today = new Date();
    const isSuspended = status === Status.Suspended;
    const isToBeRescheduled = status === Status.ToBeRescheduled;
    const isOriginallyCompleted = originalData?.status === Status.Completed;
    const [effectiveDueDate, dueDuration] = getEffectiveDueDateAndDueDuration();
    const isPredictivelyCompleted = !isOriginallyCompleted && isToBeRescheduled && (isNullOrUndefined(dueDuration) || dueDuration <= 0);
    const isCompleted = status === Status.Completed || isPredictivelyCompleted;
    const isOverdue = isNotNullAndUndefined(dueDuration) && dueDuration < 0;
    const isDue = dueDuration === 0;
    const formattedDueDate = getFormattedDueDate();
    const formattedDueDuration = getFormattedDueDuration();

    const context = useComponentContext<ReminderContext>({props, extra: {isDue, isOverdue, isCompleted}});

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
            case Mode.Alarm:
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
                {showProgressStripes && (<ProgressStripes style={computedStyle.ProgressStripes} msAnimationDuration={500}/>)}
                <Icon style={computedStyle.Icon} name={getIcon()} pointerEvents={"none"}/>
                <View style={computedStyle.NameTagAndDeadlineContainer}>
                    {renderName()}
                    {formattedDueDate && (<>
                        <Icon style={computedStyle.DueDateIcon} name={DefaultIconSet.Calendar}/>
                        <Text style={computedStyle.DueDate}>{formattedDueDate}</Text>
                    </>)}
                    {formattedDueDuration && (<>
                        <Icon style={computedStyle.DueDurationIcon} name={DefaultIconSet.History}/>
                        <Text style={computedStyle.DueDuration}>{formattedDueDuration}</Text>
                    </>)}
                    {renderTags()}
                </View>
                {(mode === Mode.Alarm || mode === Mode.Draft || mode === Mode.Edit) && renderExpansionArea()}
            </Pressable>
        </ReminderContext.Provider>
    );

    function getIcon(): DefaultIconSet
    {
        return isCompleted
            ? DefaultIconSet.CheckMarkInsideCircle
            : isSuspended
                ? DefaultIconSet.Zzz
                : isToBeRescheduled
                    ? DefaultIconSet.History
                    : isOverdue
                        ? DefaultIconSet.ExclamationMarkInsideCircle
                        : isDue || mode === Mode.Alarm
                            ? DefaultIconSet.Alarm
                            : isNullOrUndefined(dueDuration)
                                ? DefaultIconSet.NoSound
                                : DefaultIconSet.Notification;
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

    function getEffectiveDueDateAndDueDuration(): [Date | undefined, number | undefined]
    {
        let effectiveDueDate = dueDate;
        let dueDuration = Service.getDueDuration(today, effectiveDueDate);
        if (isToBeRescheduled)
        {
            effectiveDueDate = Service.getNextDueDate(recurrencePattern);
            dueDuration = Service.getDueDuration(today, effectiveDueDate);
            if (isOriginallyCompleted && (isNullOrUndefined(dueDuration) || dueDuration < 0))
            {
                effectiveDueDate = undefined;
                dueDuration = undefined;
            }
        }

        return [effectiveDueDate, dueDuration];
    }

    function getFormattedDueDate(): string
    {
        return isSuspended
            ? "Suspended"
            : isCompleted
                ? "Completed"
                : effectiveDueDate
                    ? GregorianCalendar.toString(effectiveDueDate, DateFormat.Short, TimeUnit.Day).replaceAll("/", ".")
                    : "No due date";
    }

    function getFormattedDueDuration(): string | undefined
    {
        return isCompleted || isSuspended || isNullOrUndefined(dueDuration)
            ? undefined
            : isDue
                ? "Today"
                : dueDuration > 0
                    ? dueDuration === 1 ? "Tomorrow" : `In ${dueDuration} days`
                    : dueDuration === -1 ? "Yesterday" : `${Math.abs(dueDuration)} days ago`;
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
                                <Text key={tagId} style={computedStyle.Tag} pointerEvents={"none"}>{tags[tagId].name ?? tagId}</Text>
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
                {mode === Mode.Draft || mode === Mode.Edit && <InputField
                    style={computedStyle.RecurrencePatternInputField}
                    placeholder={recurrencePatternPlaceholder}
                    value={recurrencePattern}
                    onChangeText={onRecurrencePatternChange}
                />}
                <NumericInputField
                    style={computedStyle.NotificationIntervalNumericInputField}
                    minValue={1}
                    maxValue={8800}
                    maximumFractionDigitCount={0}
                    selectTextOnFocus={true}
                    placeholder={notificationIntervalPlaceholder}
                    defaultValue={notificationInterval}
                    keyboardType={"number-pad"}
                    onChange={onNotificationIntervalChange}
                />
                <Toggle
                    style={computedStyle.SuspenseToggle}
                    icon={DefaultIconSet.Zzz}
                    status={isSuspended ? ToggleStatus.Checked : ToggleStatus.Unchecked}
                    disabled={isToBeRescheduled}
                    onChange={onSuspenseToggleStatusChange}
                />
                <Toggle
                    style={computedStyle.RescheduleToggle}
                    icon={isOriginallyCompleted ? DefaultIconSet.History : DefaultIconSet.CheckMarkInsideCircle}
                    status={isToBeRescheduled ? ToggleStatus.Checked : ToggleStatus.Unchecked}
                    disabled={isSuspended || !isToBeRescheduled && (isNotNullAndUndefined(dueDuration) && !isDue && !isOverdue)}
                    onChange={onRescheduleToggleStatusChange}
                />
                <Button
                    style={computedStyle.RescheduleButton}
                    label={isToBeRescheduled ? "Complete" : "Snooze"}
                    disabled={mode !== Mode.Alarm}
                />
            </View>
        );
    }

    function onNameChange(newText: string): void
    {
        onChange?.({
            name: newText,
            recurrencePattern,
            notificationInterval,
            tags,
            status,
            dueDate,
            modifiedDate,
            createdDate
        });
    }

    function onTagChange(pressedTagId: string): void
    {
        const pressedTag = tags[pressedTagId];
        const pressedTagNewStatus = pressedTag.status === TagStatus.Selected
            ? undefined
            : pressedTag.status === undefined
                ? TagStatus.Selected
                : pressedTag.status;

        onChange?.({
            name,
            recurrencePattern,
            notificationInterval,
            tags: {
                ...tags,
                [pressedTagId]: {
                    ...pressedTag,
                    status: pressedTagNewStatus,
                    order: pressedTagNewStatus === TagStatus.Selected
                        ? Object.values(tags).filter(x => x.status === TagStatus.Selected).length + 1
                        : undefined
                }
            },
            status,
            dueDate,
            modifiedDate,
            createdDate
        });
    }

    function onRecurrencePatternChange(newText: string): void
    {
        onChange?.({
            name,
            recurrencePattern: newText,
            notificationInterval,
            tags,
            status,
            dueDate: Service.getNextDueDate(newText),
            modifiedDate,
            createdDate
        });
    }

    function onNotificationIntervalChange(newValue: number | undefined): void
    {
        onChange?.({
            name,
            recurrencePattern,
            notificationInterval: newValue,
            tags,
            status,
            dueDate,
            modifiedDate,
            createdDate
        });
    }

    function onSuspenseToggleStatusChange(newStatus: ToggleStatus): void
    {
        const nextStatus = newStatus === ToggleStatus.Checked
            ? Status.Suspended
            : isOriginallyCompleted
                ? Status.Completed
                : Status.Scheduled;

        onChange?.({
            name,
            recurrencePattern,
            notificationInterval,
            tags,
            status: nextStatus,
            dueDate,
            modifiedDate,
            createdDate
        });
    }

    function onRescheduleToggleStatusChange(newStatus: ToggleStatus): void
    {
        const nextStatus = newStatus === ToggleStatus.Checked
            ? Status.ToBeRescheduled
            : isOriginallyCompleted
                ? Status.Completed
                : Status.Scheduled;

        onChange?.({
            name,
            recurrencePattern,
            notificationInterval,
            tags,
            status: nextStatus,
            dueDate,
            modifiedDate,
            createdDate
        });
    }
});

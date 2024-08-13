import {Button} from "@miniskylab/antimatter-button";
import {DropdownMenu, DropdownMenuProps, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {
    type AllPropertiesMustPresent,
    DateFormat,
    EMPTY_STRING,
    GregorianCalendar,
    isNotNullAndUndefined,
    TimeUnit,
    Ts,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {ProgressStripes} from "@miniskylab/antimatter-motion-graphics";
import {NumericInputField} from "@miniskylab/antimatter-numeric-input-field";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {Text} from "@miniskylab/antimatter-text";
import {Status, Toggle} from "@miniskylab/antimatter-toggle";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {forwardRef, JSX, MutableRefObject, useImperativeHandle, useMemo, useRef, useState} from "react";
import {Mode, TagMetadata, TagStatus} from "./enums";
import {type Props, type Ref, ReminderContext, type ReminderState} from "./models";
import {getNextExecutionTime} from "./services";
import type {Tag} from "./types";

export const Component = forwardRef(function Component(
    {
        style,
        id,
        name = EMPTY_STRING,
        recurrencePattern = EMPTY_STRING,
        recurrencePatternPlaceholder = EMPTY_STRING,
        notificationInterval,
        notificationIntervalPlaceholder = EMPTY_STRING,
        tags = {},
        maxSelectedTagCount = 2,
        showProgressStripes,
        toBeDeleted,
        modifiedDate,
        createdDate,
        mode = Mode.ReadOnly,
        onPress,
        onChange
    }: Props,
    ref: MutableRefObject<Ref>
): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, id, name, recurrencePattern, recurrencePatternPlaceholder, notificationInterval, notificationIntervalPlaceholder, tags,
        maxSelectedTagCount, showProgressStripes, toBeDeleted, modifiedDate, createdDate, mode, onPress, onChange
    };

    const [state, setState] = useState<ReminderState>({
        isMarkedAsDone: false
    });

    const context = useMemo<ReminderContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    const rootContainerRef = useRef<Pressable<Ref>>(null);
    const lastInputtedRecurrencePatternRef = useRef<string>(EMPTY_STRING);
    const notificationIntervalNumericInputFieldUpdateKeyRef = useRef<number>();

    const [formattedDueDate, formattedDueDuration] = useMemo(
        () => getFormattedDueDateAndDueDuration(),
        [recurrencePattern]
    );

    useImperativeHandle(ref, () => ({
        flashHighlight: rootContainerRef.current?.flashHighlight,
        editModeExpandHeight: rootContainerRef.current?.editModeExpandHeight,
        notificationModeExpandHeight: rootContainerRef.current?.notificationModeExpandHeight,
        contractHeight: rootContainerRef.current?.contractHeight,
        collapseHeight: rootContainerRef.current?.collapseHeight
    }), []);

    return (
        <ReminderContext.Provider value={context}>
            <Pressable ref={rootContainerRef} style={computedStyle.Root} onPress={onPress} disabled={toBeDeleted}>
                {showProgressStripes && (<ProgressStripes style={computedStyle.ProgressStripes} msAnimationDuration={500}/>)}
                <Icon style={computedStyle.Icon} name={getIcon()} pointerEvents={"none"}/>
                <View style={computedStyle.NameTagAndDeadlineContainer}>
                    {renderName()}
                    {formattedDueDate && (<>
                        <Icon style={computedStyle.DueDateIcon} name={DefaultIconSet.Calendar}/>
                        <Text style={computedStyle.DueDate}>{formattedDueDate}</Text>
                    </>)}
                    {formattedDueDuration && (<>
                        <Icon style={computedStyle.DueDurationIcon} name={DefaultIconSet.Alarm}/>
                        <Text style={computedStyle.DueDuration}>{formattedDueDuration}</Text>
                    </>)}
                    {renderTags()}
                </View>
                {(mode === Mode.Draft || mode === Mode.Edit) && renderExpansionArea()}
            </Pressable>
        </ReminderContext.Provider>
    );

    function byOrder(tagA: Tag, tagB: Tag): number
    {
        return isNotNullAndUndefined(tagA.order) && isNotNullAndUndefined(tagB.order)
            ? tagA.order - tagB.order
            : NaN;
    }

    function getIcon(): DefaultIconSet
    {
        let icon = DefaultIconSet.PriceTag;
        Object.values(tags)
            .filter(tag => tag.status === TagStatus.Selected)
            .sort(byOrder)
            .forEach(selectedTag =>
            {
                if (selectedTag.icon)
                {
                    icon = (DefaultIconSet as Record<string, DefaultIconSet>)[selectedTag.icon] ?? icon;
                }
            });

        return icon;
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

    function getFormattedDueDateAndDueDuration(): [string?, string?]
    {
        const dueDate = getNextExecutionTime(recurrencePattern);
        const formattedDueDate = dueDate
            ? GregorianCalendar.toString(dueDate, DateFormat.Short, TimeUnit.Day).replaceAll("/", ".")
            : "No due date";

        let formattedDueDuration: string | undefined;
        if (dueDate)
        {
            const dueDuration = GregorianCalendar.getDayCount(new Date(), dueDate, true);
            formattedDueDuration = dueDuration === 0
                ? "Today"
                : dueDuration > 0
                    ? dueDuration === 1 ? "Tomorrow" : `In ${dueDuration} days`
                    : Math.abs(dueDuration) === 1 ? "Yesterday" : `${Math.abs(dueDuration)} days ago`;
        }

        return [formattedDueDate, formattedDueDuration];
    }

    function renderName(): JSX.Element
    {
        return (
            mode === Mode.Draft || mode === Mode.Edit
                ? <InputField
                    style={computedStyle.NameInputField}
                    placeholder={"Reminder Name"}
                    value={name}
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
                <InputField
                    style={computedStyle.RecurrencePatternInputField}
                    placeholder={recurrencePatternPlaceholder}
                    value={recurrencePattern === "Done" ? lastInputtedRecurrencePatternRef.current : recurrencePattern}
                    editable={!state.isMarkedAsDone}
                    onChangeText={onRecurrencePatternChange}
                />
                <NumericInputField
                    style={computedStyle.NotificationIntervalNumericInputField}
                    key={notificationIntervalNumericInputFieldUpdateKeyRef.current}
                    minValue={0}
                    maxValue={8800}
                    treatEmptyInputAsZero={true}
                    maximumFractionDigitCount={0}
                    editable={!state.isMarkedAsDone}
                    focusable={!state.isMarkedAsDone}
                    selectTextOnFocus={!state.isMarkedAsDone}
                    placeholder={notificationIntervalPlaceholder}
                    defaultValue={notificationInterval}
                    keyboardType={"number-pad"}
                    onChange={onNotificationIntervalChange}
                />
                <Toggle
                    style={computedStyle.DoneToggle}
                    icon={DefaultIconSet.CheckMarkInsideCircle}
                    status={recurrencePattern === "Done" ? Status.Checked : Status.Unchecked}
                    onChange={onDoneToggleStatusChange}
                />
                <Toggle
                    style={computedStyle.MuteToggle}
                    icon={DefaultIconSet.NoSound}
                    status={notificationInterval === 0 ? Status.Checked : Status.Unchecked}
                    disabled={state.isMarkedAsDone}
                    onChange={onMuteToggleStatusChange}
                />
                <Button style={computedStyle.DismissButton} label={"Dismiss"}/>
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
            modifiedDate,
            createdDate
        });
    }

    function onNotificationIntervalChange(newValue: number): void
    {
        onChange?.({
            name,
            recurrencePattern,
            notificationInterval: newValue,
            tags,
            modifiedDate,
            createdDate
        });
    }

    function onDoneToggleStatusChange(newStatus: Status): void
    {
        if (newStatus === Status.Checked)
        {
            lastInputtedRecurrencePatternRef.current = recurrencePattern;
            setState({isMarkedAsDone: true});
            onRecurrencePatternChange("Done");
        }
        else
        {
            setState({isMarkedAsDone: false});
            onRecurrencePatternChange(lastInputtedRecurrencePatternRef.current);
        }
    }

    function onMuteToggleStatusChange(newStatus: Status): void
    {
        notificationIntervalNumericInputFieldUpdateKeyRef.current = Date.now();
        onNotificationIntervalChange(newStatus === Status.Checked ? 0 : 1);
    }
});

import {Button} from "@miniskylab/antimatter-button";
import {DropdownMenu, DropdownMenuProps, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {type AllPropertiesMustPresent, EMPTY_STRING, isNotNullAndUndefined, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {ProgressStripes} from "@miniskylab/antimatter-motion-graphics";
import {NumericInputField} from "@miniskylab/antimatter-numeric-input-field";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {Text} from "@miniskylab/antimatter-text";
import {Toggle} from "@miniskylab/antimatter-toggle";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import {DataListOperationMode} from "@miniskylab/data-list";
import React, {forwardRef, JSX, MutableRefObject, useImperativeHandle, useMemo, useRef} from "react";
import {Tag} from "./classes";
import {TagMetadata, TagStatus} from "./enums";
import {Props, type Ref, ReminderContext} from "./models";

/**
 * A component for displaying a single reminder in the todo list.
 */
export const Component = forwardRef(function Component(
    {
        style,
        id,
        name = EMPTY_STRING,
        tags = {},
        maxSelectedTagCount = 1,
        showProgressStripes,
        toBeDeleted,
        modifiedDate,
        createdDate,
        mode = DataListOperationMode.ReadOnly,
        onPress,
        onChange
    }: Props,
    ref: MutableRefObject<Ref>
): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, id, name, tags, maxSelectedTagCount, showProgressStripes, toBeDeleted, modifiedDate, createdDate, mode, onPress, onChange
    };

    const context = useMemo<ReminderContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    const rootContainerRef = useRef<Pressable<Ref>>(null);
    useImperativeHandle(ref, () => ({
        flashHighlight: rootContainerRef.current?.flashHighlight,
        verticalContract: rootContainerRef.current?.verticalContract
    }), []);

    return (
        <ReminderContext.Provider value={context}>
            <Pressable ref={rootContainerRef} style={computedStyle.Root} onPress={onPress} disabled={toBeDeleted}>
                {showProgressStripes && (<ProgressStripes style={computedStyle.ProgressStripes} msAnimationDuration={500}/>)}
                <Icon style={computedStyle.Icon} name={getIcon()} pointerEvents={"none"}/>
                <View style={computedStyle.NameTagAndDeadlineContainer}>
                    {renderName()}
                    {renderDeadline()}
                    {renderTags()}
                </View>
                <View style={computedStyle.ExpansionArea}>
                    <InputField
                        style={computedStyle.RecurrencePatternInputField}
                        placeholder={"Recurrence Pattern"}
                        value={"0 0 0 8 8 ? 2024"}
                    />
                    <NumericInputField
                        style={computedStyle.NotificationIntervalNumericInputField}
                        minValue={0}
                        maxValue={8800}
                        treatEmptyInputAsZero={true}
                        maximumFractionDigitCount={0}
                        placeholder={"Notification Interval (Hours)"}
                        defaultValue={1}
                    />
                    <Toggle style={computedStyle.DoneToggle} icon={DefaultIconSet.CheckMarkInsideCircle}/>
                    <Toggle style={computedStyle.MuteToggle} icon={DefaultIconSet.NoSound}/>
                    <Button style={computedStyle.DismissButton} label={"Dismiss"}/>
                </View>
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

    function renderName(): JSX.Element
    {
        return (
            mode === DataListOperationMode.Draft || mode === DataListOperationMode.Edit
                ? <InputField
                    style={computedStyle.NameInputField}
                    placeholder={"Reminder Name"}
                    value={name}
                    onChangeText={onNameChange}
                />
                : <Text style={computedStyle.NameText} numberOfLines={1} pointerEvents={"none"}>{name}</Text>
        );
    }

    function renderDeadline(): JSX.Element
    {
        return (
            <>
                <Icon style={computedStyle.DueDateIcon} name={DefaultIconSet.Calendar}/>
                <Text style={computedStyle.DueDate}>{"15/08/2024"}</Text>
                <Icon style={computedStyle.DueDurationIcon} name={DefaultIconSet.Alarm}/>
                <Text style={computedStyle.DueDuration}>{"In 100 days"}</Text>
            </>
        );
    }

    function renderTags(): JSX.Element
    {
        const dropdownMenuItems = getDropdownMenuItems();
        if (mode === DataListOperationMode.Draft || mode === DataListOperationMode.Edit)
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

    function onNameChange(newText: string): void
    {
        onChange?.({
            name: newText,
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
});

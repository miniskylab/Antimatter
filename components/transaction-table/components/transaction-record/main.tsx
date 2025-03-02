import {DropdownMenu, DropdownMenuProps, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {
    type AllPropertiesMustPresent,
    EMPTY_STRING,
    isNotNullAndUndefined,
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
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {forwardRef, JSX, RefObject, useImperativeHandle, useRef} from "react";
import {Mode, TagMetadata, TagStatus} from "./enums";
import {type Props, type Ref, TagIdContext, TransactionRecordContext} from "./models";
import type {Tag} from "./types";

export const Component = forwardRef(function Component(
    {
        style,
        id,
        name = EMPTY_STRING,
        namePlaceholder = EMPTY_STRING,
        tags = {},
        amount = 0,
        maxSelectedTagCount = 3,
        isShowingProgressStripes,
        isToBeDeleted,
        executedDate,
        modifiedDate,
        createdDate,
        mode = Mode.ReadOnly,
        onPress,
        onChange
    }: Props,
    ref: RefObject<Ref>
): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, id, name, namePlaceholder, tags, amount, maxSelectedTagCount, isShowingProgressStripes, isToBeDeleted, executedDate,
        modifiedDate, createdDate, mode, onPress, onChange
    };

    const rootContainerRef = useRef<Pressable<Ref>>(null);

    const context = useComponentContext<TransactionRecordContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    useImperativeHandle(ref, () => ({
        flashHighlight: rootContainerRef.current?.flashHighlight,
        collapseHeight: rootContainerRef.current?.collapseHeight
    }), []);

    return (
        <TransactionRecordContext.Provider value={context}>
            <Pressable ref={rootContainerRef} style={computedStyle.Root} onPress={onPress} disabled={isToBeDeleted}>
                {isShowingProgressStripes && (<ProgressStripes style={computedStyle.ProgressStripes} msAnimationDuration={500}/>)}
                <Icon style={computedStyle.Icon} name={getIcon()} pointerEvents={"none"}/>
                <View style={computedStyle.NameAndTagContainer}>
                    {renderName()}
                    {renderTags()}
                </View>
                {renderAmount()}
            </Pressable>
        </TransactionRecordContext.Provider>
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
            mode === Mode.Draft || mode === Mode.Edit
                ? <InputField
                    style={computedStyle.NameInputField}
                    placeholder={namePlaceholder}
                    value={name}
                    onChangeText={onNameChange}
                />
                : <Text style={computedStyle.NameText} numberOfLines={1} pointerEvents={"none"}>{name}</Text>
        );
    }

    function renderAmount(): JSX.Element
    {
        const explicitPlusSymbol = Object.values(tags)
            .some(tag => tag.status === TagStatus.Selected && tag.metadata?.has(TagMetadata.ExplicitPlusSymbol));

        return (
            mode === Mode.Draft || mode === Mode.Edit
                ? <NumericInputField
                    style={computedStyle.AmountInputField}
                    autoFocus={true}
                    minValue={0}
                    maxValue={999999999}
                    selectTextOnFocus={true}
                    treatEmptyInputAsZero={true}
                    showPlusSymbolForPositiveNumber={explicitPlusSymbol}
                    maximumFractionDigitCount={0}
                    maximumDigitCount={9}
                    defaultValue={amount}
                    keyboardType={"number-pad"}
                    onChange={onAmountChange}
                />
                : <Text style={computedStyle.AmountText} pointerEvents={"none"}>
                    {`${explicitPlusSymbol ? "+" : EMPTY_STRING}${amount.toLocaleString("en-us")}`}
                </Text>
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

    function onNameChange(newText: string): void { onChange?.({name: newText}); }

    function onAmountChange(newValue: number): void { onChange?.({amount: newValue}); }

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
});

import {DropdownMenu, DropdownMenuProps, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {AllPropertiesMustPresent, EMPTY_STRING, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import {NumericInputField} from "@miniskylab/antimatter-numeric-input-field";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Mode, TagMetadata, TagStatus} from "./enums";
import {Props, TagMetadataContext, TransactionRecordContext} from "./models";
import {Tag} from "./types";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    id,
    name = EMPTY_STRING,
    tags = {},
    amount = 0,
    maxSelectedTagCount = 3,
    executedDate,
    modifiedDate,
    createdDate,
    mode = Mode.ReadOnly,
    onPress,
    onChange
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, id, name, tags, amount, maxSelectedTagCount, executedDate, modifiedDate, createdDate, mode, onPress, onChange
    };

    const context = useMemo<TransactionRecordContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const computedStyle = useComputedStyle(style, props);

    return (
        <TransactionRecordContext.Provider value={context}>
            <Pressable style={computedStyle.Root} onPress={onPress}>
                <Icon style={computedStyle.Icon} name={getIcon()}/>
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
        return tagA.order !== null && tagA.order !== undefined && tagB.order !== null && tagB.order !== undefined
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
                    placeholder={"Transaction Name"}
                    value={name}
                    onChangeText={onNameChange}
                />
                : <Label style={computedStyle.NameLabel} numberOfLines={1}>{name}</Label>
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
                    selectAllOnFocus={true}
                    treatEmptyInputAsZero={true}
                    showPlusSymbolForPositiveNumber={explicitPlusSymbol}
                    maximumFractionDigitCount={0}
                    maximumDigitCount={9}
                    defaultValue={amount}
                    keyboardType={"number-pad"}
                    onChange={onAmountChange}
                />
                : <Label style={computedStyle.AmountLabel}>
                    {`${explicitPlusSymbol ? "+" : EMPTY_STRING}${amount.toLocaleString("en-us")}`}
                </Label>
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
                <View style={computedStyle.TagContainer}>
                    {
                        [...Object.keys(tags).filter(x => tags[x].status === TagStatus.Selected)]
                            .sort((a, b) => dropdownMenuItemValues.indexOf(a) - dropdownMenuItemValues.indexOf(b))
                            .map(tagId => (
                                <TagMetadataContext.Provider key={tagId} value={Array.from(tags[tagId].metadata ?? []).sort().join(",")}>
                                    <Label style={computedStyle.Tag}>{tags[tagId].name ?? tagId}</Label>
                                </TagMetadataContext.Provider>
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
            amount,
            tags,
            executedDate,
            modifiedDate,
            createdDate
        });
    }

    function onAmountChange(newValue: number): void
    {
        onChange?.({
            name,
            amount: newValue,
            tags,
            executedDate,
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
            amount,
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
            executedDate,
            modifiedDate,
            createdDate
        });
    }
}

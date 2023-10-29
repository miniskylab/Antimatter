import {DropdownMenu, DropdownMenuProps, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {EMPTY_STRING, Style, Ts} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import {NumericInputField} from "@miniskylab/antimatter-numeric-input-field";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Mode, TagStatus} from "./enums";
import {Props, TransactionRecordContext} from "./models";
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
    executedDate,
    modifiedDate,
    createdDate,
    mode = Mode.ReadOnly,
    onPress,
    onChange
}: Props): JSX.Element
{
    const props: Required<Props> = {
        style, id, name, tags, amount, executedDate, modifiedDate, createdDate, mode, onPress, onChange
    };

    const context = useMemo<TransactionRecordContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const computedStyle = Style.useComputedStyle(style, props);
    const maxSelectedTagCount = 3;

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
        return tagA.order - tagB.order;
    }

    function getIcon(): DefaultIconSet
    {
        let icon = DefaultIconSet.PriceTag;
        Object.values(tags)
            .filter(tag => tag.status === TagStatus.Selected)
            .sort(byOrder)
            .forEach(selectedTag => { icon = (DefaultIconSet as Record<string, DefaultIconSet>)[selectedTag.icon] ?? icon; });

        return icon;
    }

    function getDropdownMenuItems(): DropdownMenuProps["menuItems"]
    {
        const dropdownMenuItems: DropdownMenuProps["menuItems"] = {};
        const selectedTagCount = Object.values(tags).filter(x => x.status === TagStatus.Selected).length;
        const incomeTagSelected = Object.values(tags).some(x => x.isIncome && x.status === TagStatus.Selected);
        Object.keys(tags).forEach(tagId =>
        {
            const tag = tags[tagId];
            const incomeTagDisabled = tag.isIncome && selectedTagCount > 0;
            const maxSelectedTagCountReached = selectedTagCount >= maxSelectedTagCount;
            const mappedMenuItemStatus = tag.status === undefined && (maxSelectedTagCountReached || incomeTagSelected)
                ? MenuItemStatus.Hidden
                : tag.status === undefined && incomeTagDisabled
                    ? MenuItemStatus.Disabled
                    : Ts.Enum.getValue(MenuItemStatus, Ts.Enum.getName(TagStatus, tag.status));

            dropdownMenuItems[tagId] = {
                displayText: tag.name,
                status: mappedMenuItemStatus
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
                    autoFocus={true}
                    value={name}
                    onChangeText={onNameChange}
                />
                : <Label style={computedStyle.NameLabel} numberOfLines={1}>{name}</Label>
        );
    }

    function renderAmount(): JSX.Element
    {
        const isIncome = Object.values(tags)
            .some(tag => tag.status === TagStatus.Selected && tag.isIncome);

        return (
            mode === Mode.Draft || mode === Mode.Edit
                ? <NumericInputField
                    style={computedStyle.AmountInputField}
                    minValue={0}
                    maxValue={999999999}
                    treatEmptyInputAsZero={true}
                    showPlusSymbolForPositiveNumber={isIncome}
                    maximumFractionDigits={0}
                    maximumDigitCount={9}
                    defaultValue={amount}
                    onChange={onAmountChange}
                />
                : <Label style={computedStyle.AmountLabel}>{`${isIncome ? "+" : EMPTY_STRING}${amount.toLocaleString("en-us")}`}</Label>
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
                            .map(tagId => (<Label key={tagId} style={computedStyle.Tag}>{tags[tagId].name ?? tagId}</Label>))
                    }
                </View>
            );
        }
    }

    function onNameChange(newText: string): void
    {
        onChange({
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
        onChange({
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

        onChange({
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

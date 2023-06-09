import {DropdownMenu, DropdownMenuProps, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {EMPTY_STRING, Enum} from "@miniskylab/antimatter-framework";
import {Icon, IconName} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import {NumericInputField} from "@miniskylab/antimatter-numeric-input-field";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Mode, TransactionLabelStatus, TransactionLabelType} from "./enum";
import {Props, TransactionRecordContext} from "./model";
import {TransactionLabel} from "./type";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    id,
    name = EMPTY_STRING,
    labels = {},
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
        style, id, name, labels, amount, executedDate, modifiedDate, createdDate, mode, onPress, onChange
    };

    const context = useMemo<TransactionRecordContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    const maxSelectedLabelCount = 3;

    return (
        <TransactionRecordContext.Provider value={context}>
            <Pressable style={computedStyle.Root} onPress={onPress}>
                <Icon style={computedStyle.Icon} name={getIcon()}/>
                <View style={computedStyle.NameAndLabelContainer}>
                    {renderName()}
                    {renderLabels()}
                </View>
                {renderAmount()}
            </Pressable>
        </TransactionRecordContext.Provider>
    );

    function byOrder(transactionLabelA: TransactionLabel, transactionLabelB: TransactionLabel): number
    {
        return transactionLabelA.order - transactionLabelB.order;
    }

    function getIcon(): IconName
    {
        let icon = IconName.PriceTag;
        Object.values(labels)
            .filter(label => label.status === TransactionLabelStatus.Selected)
            .sort(byOrder)
            .forEach(selectedLabel => { icon = (IconName as Record<string, IconName>)[selectedLabel.icon] ?? icon; });

        return icon;
    }

    function getDropdownMenuItems(): DropdownMenuProps["menuItems"]
    {
        const dropdownMenuItems: DropdownMenuProps["menuItems"] = {};
        const selectedLabelCount = Object.values(labels).filter(x => x.status === TransactionLabelStatus.Selected).length;
        Object.keys(labels).forEach(labelId =>
        {
            const label = labels[labelId];
            const mappedMenuItemStatus = Enum.getValue(MenuItemStatus, Enum.getName(TransactionLabelStatus, label.status));
            dropdownMenuItems[labelId] = {
                displayText: label.name,
                status: selectedLabelCount < maxSelectedLabelCount
                    ? mappedMenuItemStatus
                    : label.status === undefined
                        ? MenuItemStatus.Disabled
                        : mappedMenuItemStatus
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
        const isIncome = Object.values(labels)
            .some(label => label.status === TransactionLabelStatus.Selected && label.type === TransactionLabelType.Income);

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

    function renderLabels(): JSX.Element
    {
        const dropdownMenuItems = getDropdownMenuItems();
        if (mode === Mode.Draft || mode === Mode.Edit)
        {
            return (
                <DropdownMenu
                    style={computedStyle.LabelSelector}
                    isOpen={true}
                    menuItems={dropdownMenuItems}
                    enableMenuHorizontalScrolling={true}
                    onMenuItemPress={onLabelChange}
                />
            );
        }
        else
        {
            const dropdownMenuItemValues = Object.keys(dropdownMenuItems);
            return (
                <View style={computedStyle.LabelContainer}>
                    {
                        [...Object.keys(labels).filter(x => labels[x].status === TransactionLabelStatus.Selected)]
                            .sort((a, b) => dropdownMenuItemValues.indexOf(a) - dropdownMenuItemValues.indexOf(b))
                            .map(labelId => (<Label key={labelId} style={computedStyle.Label}>{labels[labelId].name ?? labelId}</Label>))
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
            labels,
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
            labels,
            executedDate,
            modifiedDate,
            createdDate
        });
    }

    function onLabelChange(pressedLabelId: string): void
    {
        const pressedLabel = labels[pressedLabelId];
        const pressedLabelNewStatus = pressedLabel.status === TransactionLabelStatus.Selected
            ? undefined
            : pressedLabel.status === undefined
                ? TransactionLabelStatus.Selected
                : pressedLabel.status;

        onChange({
            name,
            amount,
            labels: {
                ...labels,
                [pressedLabelId]: {
                    ...pressedLabel,
                    status: pressedLabelNewStatus,
                    order: pressedLabelNewStatus === TransactionLabelStatus.Selected
                        ? Object.values(labels).filter(x => x.status === TransactionLabelStatus.Selected).length + 1
                        : undefined
                }
            },
            executedDate,
            modifiedDate,
            createdDate
        });
    }
}

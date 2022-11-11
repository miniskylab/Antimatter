import {DropdownMenu, DropdownMenuProps, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import {NumericInputField} from "@miniskylab/antimatter-numeric-input-field";
import {Enum} from "@miniskylab/antimatter-typescript";
import React from "react";
import {Mode, TransactionLabel, TransactionLabelStatus, TransactionLabelType, TransactionRecordProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className,
    name = String.EMPTY,
    labels = {},
    amount = 0,
    executedDate,
    modifiedDate,
    createdDate,
    mode = Mode.ReadOnly,
    onClick,
    onChange
}: TransactionRecordProps): JSX.Element
{
    return (
        <div className={bem(className, null, getModeModifier())} onClick={onClick}>
            <Icon className={bem("TransactionTable-TransactionRecord-Icon")} name={getIcon()}/>
            <div className={bem(className, "NameAndLabelContainer")}>
                {renderName()}
                {renderLabels()}
            </div>
            {renderAmount()}
        </div>
    );

    function getModeModifier(): string
    {
        switch (mode)
        {
            case Mode.Draft:
                return "DraftMode";

            case Mode.Edit:
                return "EditMode";

            case Mode.Delete:
                return "DeleteMode";

            default:
            case Mode.ReadOnly:
                return onClick ? "ReadOnlyMode" : String.EMPTY;
        }
    }

    function byOrder(transactionLabelA: TransactionLabel, transactionLabelB: TransactionLabel): number
    {
        return transactionLabelA.order - transactionLabelB.order;
    }

    function getIcon(): string
    {
        let icon: string = Icomoon.PriceTag;
        Object.values(labels)
            .filter(label => label.status === TransactionLabelStatus.Selected)
            .sort(byOrder)
            .forEach(selectedLabel => { icon = (Icomoon as Record<string, string>)[selectedLabel.icon] ?? icon; });

        return icon;
    }

    function getDropdownMenuItems(): DropdownMenuProps["menuItems"]
    {
        const dropdownMenuItems: ReturnType<typeof getDropdownMenuItems> = {};
        Object.keys(labels).forEach(labelId =>
        {
            const label = labels[labelId];
            dropdownMenuItems[labelId] = {
                displayText: label.name,
                status: Enum.getValue(MenuItemStatus, Enum.getName(TransactionLabelStatus, label.status))
            };
        });

        return dropdownMenuItems;
    }

    function renderName(): JSX.Element
    {
        return (
            mode === Mode.Draft || mode === Mode.Edit
                ? <InputField
                    className={bem("TransactionTable-TransactionRecord-NameInputField")}
                    placeholder={"Transaction Name"}
                    autoFocus={true}
                    value={name}
                    onChange={newValue =>
                    {
                        onChange({
                            name: newValue,
                            amount,
                            labels,
                            executedDate,
                            modifiedDate,
                            createdDate
                        });
                    }}
                />
                : <Label className={bem("TransactionTable-TransactionRecord-Name")} text={name}/>
        );
    }

    function renderAmount(): JSX.Element
    {
        const isIncome = Object.values(labels)
            .some(label => label.status === TransactionLabelStatus.Selected && label.type === TransactionLabelType.Income);

        return (
            mode === Mode.Draft || mode === Mode.Edit
                ? <NumericInputField
                    className={bem("TransactionTable-TransactionRecord-AmountInputField", null, isIncome ? "Income" : "Expense")}
                    minValue={0}
                    maxValue={999999999}
                    showPlusSymbolForPositiveNumber={isIncome}
                    maximumDigitCount={9}
                    maximumFractionDigits={0}
                    defaultValue={amount}
                    onChange={newValue =>
                    {
                        onChange({
                            name,
                            amount: newValue,
                            labels,
                            executedDate,
                            modifiedDate,
                            createdDate
                        });
                    }}
                />
                : <Label
                    className={bem("TransactionTable-TransactionRecord-Amount", null, isIncome ? "Income" : "Expense")}
                    text={`${isIncome ? "+" : String.EMPTY}${amount.toLocaleString()}`}
                />
        );
    }

    function renderLabels(): JSX.Element
    {
        const dropdownMenuItems = getDropdownMenuItems();
        if (mode === Mode.Draft || mode === Mode.Edit)
        {
            return (
                <DropdownMenu
                    className={bem("TransactionTable-TransactionRecord-LabelSelector")}
                    menuItems={dropdownMenuItems}
                    onClick={clickedLabelId =>
                    {
                        const clickedLabel = labels[clickedLabelId];
                        const clickedLabelNewStatus = clickedLabel.status === TransactionLabelStatus.Selected
                            ? undefined
                            : clickedLabel.status === undefined
                                ? TransactionLabelStatus.Selected
                                : clickedLabel.status;

                        onChange({
                            name,
                            amount,
                            labels: {
                                ...labels,
                                [clickedLabelId]: {
                                    ...clickedLabel,
                                    status: clickedLabelNewStatus,
                                    order: clickedLabelNewStatus === TransactionLabelStatus.Selected
                                        ? Object.values(labels).filter(x => x.status === TransactionLabelStatus.Selected).length + 1
                                        : undefined
                                }
                            },
                            executedDate,
                            modifiedDate,
                            createdDate
                        });
                    }}
                />
            );
        }
        else
        {
            const dropdownMenuItemValues = Object.keys(dropdownMenuItems);
            return (
                <div className={bem(className, "LabelContainer")}>
                    {
                        [...Object.keys(labels).filter(x => labels[x].status === TransactionLabelStatus.Selected)]
                            .sort((a, b) => dropdownMenuItemValues.indexOf(a) - dropdownMenuItemValues.indexOf(b))
                            .map(labelId => (
                                <Label
                                    key={labelId}
                                    className={bem("TransactionTable-TransactionRecord-Label")}
                                    text={labels[labelId].name ?? labelId}
                                />
                            ))
                    }
                </div>
            );
        }
    }
}

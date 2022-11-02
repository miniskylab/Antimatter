import {DropdownMenu} from "@miniskylab/antimatter-dropdown-menu";
import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import {NumericInputField} from "@miniskylab/antimatter-numeric-input-field";
import React from "react";
import {LabelType, Mode, TransactionRecordProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className,
    name = String.EMPTY,
    label,
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

    function getIcon(): string
    {
        let icon: string = Icomoon.PriceTag;
        label?.selectedValues.forEach(x => { icon = (Icomoon as Record<string, string>)[label?.selectionOptions[x].icon] ?? icon; });

        return icon;
    }

    function getDropdownMenuKeyValueSet(): Record<string, string>
    {
        return Object.keys(label?.selectionOptions ?? {})
            .reduce((keyValueSet: Record<string, string>, labelId) =>
            {
                keyValueSet[labelId] = label.selectionOptions[labelId].name;
                return keyValueSet;
            }, {});
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
                            labels: label.selectedValues,
                            executedDate,
                            modifiedDate,
                            createdDate
                        });
                    }}
                />
                : <Label className={bem("TransactionTable-TransactionRecord-Name")} text={name}/>
        );
    }

    function renderLabels(): JSX.Element
    {
        const dropdownMenuKeyValueSet = getDropdownMenuKeyValueSet();
        if (mode === Mode.Draft || mode === Mode.Edit)
        {
            return (
                <DropdownMenu
                    className={bem("TransactionTable-TransactionRecord-LabelSelector")}
                    maxSelectionCount={2}
                    keyValueSet={dropdownMenuKeyValueSet}
                    selectedKeys={label.selectedValues}
                    onChange={newlySelectedKeys =>
                    {
                        onChange({
                            name,
                            amount,
                            labels: newlySelectedKeys,
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
            const dropdownMenuKeySet = Object.keys(dropdownMenuKeyValueSet);
            return (
                <div className={bem(className, "LabelContainer")}>
                    {[...(label?.selectedValues ?? [])]
                        .sort((a, b) => dropdownMenuKeySet.indexOf(a) - dropdownMenuKeySet.indexOf(b))
                        .map(labelId => (
                            <Label
                                key={labelId}
                                className={bem("TransactionTable-TransactionRecord-Label")}
                                text={label.selectionOptions[labelId].name}
                            />
                        ))}
                </div>
            );
        }
    }

    function renderAmount(): JSX.Element
    {
        const isIncome = label?.selectedValues.some(labelId => label.selectionOptions[labelId].type === LabelType.Income);
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
                            labels: label.selectedValues,
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
}

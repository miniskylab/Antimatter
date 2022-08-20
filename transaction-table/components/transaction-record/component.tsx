import {DropdownMenu} from "@miniskylab/antimatter-dropdown-menu";
import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import {NumericInputField} from "@miniskylab/antimatter-numeric-input-field";
import React from "react";
import {Mode, TransactionRecordProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className,
    name = String.EMPTY,
    labelSet = {},
    labels = [],
    amount = 0,
    executedDate,
    modifiedDate,
    mode = Mode.ReadOnly,
    onClick,
    onChange
}: TransactionRecordProps): JSX.Element
{
    return (
        <div className={`${className}${getModeModifier()}`} onClick={onClick}>
            <Icon className={`${className}__icon`} name={getIcon()}/>
            <div className={`${className}__name-and-label-container`}>
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
                return "--draft-mode";

            case Mode.Edit:
                return "--edit-mode";

            case Mode.Delete:
                return "--delete-mode";

            default:
            case Mode.ReadOnly:
                return onClick ? "--read-only-mode" : String.EMPTY;
        }
    }

    function getIcon(): string
    {
        let icon: string = Icomoon.PriceTag;
        labels?.forEach(x => { icon = labelSet[x]?.icon ?? icon; });

        return icon;
    }

    function getDropdownMenuKeyValueSet(): Record<string, string>
    {
        return Object.keys(labelSet)
            .reduce((keyValueSet: Record<string, string>, labelId) =>
            {
                keyValueSet[labelId] = labelSet[labelId].name;
                return keyValueSet;
            }, {});
    }

    function renderName(): JSX.Element
    {
        return (
            mode === Mode.Draft || mode === Mode.Edit
                ? <InputField
                    className={`${className}__name-input-field`}
                    placeholder={"Transaction Name"}
                    autoFocus={true}
                    value={name}
                    onChange={newValue => { onChange({name: newValue, amount, labels, executedDate, modifiedDate}); }}
                />
                : <Label className={`${className}__name`} text={name}/>
        );
    }

    function renderLabels(): JSX.Element
    {
        if (mode === Mode.Draft || mode === Mode.Edit)
        {
            return (
                <DropdownMenu
                    className={`${className}__label-selector`}
                    maxSelectionCount={2}
                    keyValueSet={getDropdownMenuKeyValueSet()}
                    selectedKeys={labels}
                    onChange={newlySelectedKeys => { onChange({name, amount, labels: newlySelectedKeys, executedDate, modifiedDate}); }}
                />
            );
        }
        else
        {
            return (
                <div className={`${className}__label-container`}>
                    {labels?.map(labelId => <Label key={labelId} className={`${className}__label`} text={labelSet[labelId].name}/>)}
                </div>
            );
        }
    }

    function renderAmount(): JSX.Element
    {
        const isIncome = labels?.some(labelId => labelSet[labelId].isIncome);
        return (
            mode === Mode.Draft || mode === Mode.Edit
                ? <NumericInputField
                    className={`${className}__amount-input-field--${isIncome ? "income" : "expense"}`}
                    minValue={0}
                    maxValue={999999999}
                    showPlusSymbolForPositiveNumber={isIncome}
                    maximumDigitCount={9}
                    maximumFractionDigits={0}
                    defaultValue={amount}
                    onChange={newValue => { onChange({name, amount: newValue, labels, executedDate, modifiedDate}); }}
                />
                : <Label
                    className={`${className}__amount--${isIncome ? "income" : "expense"}`}
                    text={`${isIncome ? "+" : String.EMPTY}${amount.toLocaleString()}`}
                />
        );
    }
}

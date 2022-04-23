import {Button} from "@miniskylab/antimatter-button";
import {DatePicker, Props as DatePickerProps} from "@miniskylab/antimatter-date-picker";
import {DropdownMenu, Props as DropdownMenuProps} from "@miniskylab/antimatter-dropdown-menu";
import {IconName} from "@miniskylab/antimatter-icon";
import {InputField, Props as InputFieldProps} from "@miniskylab/antimatter-input-field";
import {Label, Props as LabelProps} from "@miniskylab/antimatter-label";
import {NumericInputField, Props as NumericInputFieldProps} from "@miniskylab/antimatter-numeric-input-field";
import React, {Fragment} from "react";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component(props: Props): JSX.Element
{
    const {
        variant = Variant.Default,
        id,
        cells = [],
        editable = false,
        onClick,
        onSaveButtonClick,
        onCancelButtonClick,
        onDeleteButtonClick
    } = props;

    let recordClassName = "record";
    if (onClick)
    {
        recordClassName += "--interactable";
    }

    let controlBoxClassName = "data-table__control-box";
    if (editable)
    {
        controlBoxClassName += "--active";
    }

    return (
        <div
            className={variant[recordClassName]}
            onClick={mouseEvent =>
            {
                mouseEvent.stopPropagation();
                onClick && onClick(id);
            }}
        >
            {
                cells.map((cell, cellIndex) => (
                    <Fragment key={cellIndex}>
                        {cell.dataType === "label" && <Label {...cell.data as LabelProps}/>}
                        {cell.dataType === "input-field" && <InputField {...cell.data as InputFieldProps}/>}
                        {cell.dataType === "numeric-input-field" && <NumericInputField {...cell.data as NumericInputFieldProps}/>}
                        {cell.dataType === "date-picker" && <DatePicker {...cell.data as DatePickerProps}/>}
                        {cell.dataType === "dropdown-menu" && <DropdownMenu {...cell.data as DropdownMenuProps}/>}
                    </Fragment>
                ))
            }
            {
                (onSaveButtonClick || onCancelButtonClick || onDeleteButtonClick) &&
                <div className={variant[controlBoxClassName]}>
                    {
                        onSaveButtonClick &&
                        <Button
                            variant={Variant.Button.Ok}
                            disabled={!editable}
                            icon={IconName.CheckMark}
                            onClick={mouseEvent =>
                            {
                                mouseEvent.stopPropagation();
                                onSaveButtonClick(id);
                            }}
                        />
                    }
                    {
                        onCancelButtonClick &&
                        <Button
                            variant={Variant.Button.Cancel}
                            disabled={!editable}
                            icon={IconName.XMark}
                            onClick={mouseEvent =>
                            {
                                mouseEvent.stopPropagation();
                                onCancelButtonClick(id);
                            }}
                        />
                    }
                    {
                        onDeleteButtonClick &&
                        <Button
                            variant={Variant.Button.Delete}
                            disabled={!editable}
                            icon={IconName.TrashCan}
                            onClick={mouseEvent =>
                            {
                                mouseEvent.stopPropagation();
                                onDeleteButtonClick(id);
                            }}
                        />
                    }
                </div>
            }
        </div>
    );
}

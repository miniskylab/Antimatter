import {Button} from "@miniskylab/antimatter-button";
import {DatePicker, DatePickerProps} from "@miniskylab/antimatter-date-picker";
import {DropdownMenu, DropdownMenuProps} from "@miniskylab/antimatter-dropdown-menu";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {InputField, InputFieldProps} from "@miniskylab/antimatter-input-field";
import {Label, LabelProps} from "@miniskylab/antimatter-label";
import {NumericInputField, NumericInputFieldProps} from "@miniskylab/antimatter-numeric-input-field";
import React, {Fragment} from "react";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className,
    id,
    cells = [],
    editable = false,
    onClick,
    onSaveButtonClick,
    onCancelButtonClick,
    onDeleteButtonClick
}: Props): JSX.Element
{
    return (
        <div
            className={`${className}${onClick ? "--Interactable" : String.EMPTY}`}
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
                <div className={`${className}__ControlBox${editable ? "--Active" : String.EMPTY}`}>
                    {
                        onSaveButtonClick &&
                        <Button
                            className={"DataTable-Record-OkButton"}
                            disabled={!editable}
                            icon={Icomoon.CheckMark}
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
                            className={"DataTable-Record-CancelButton"}
                            disabled={!editable}
                            icon={Icomoon.XMark}
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
                            className={"DataTable-Record-DeleteButton"}
                            disabled={!editable}
                            icon={Icomoon.TrashCan}
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

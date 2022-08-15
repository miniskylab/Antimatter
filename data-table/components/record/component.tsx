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
export function Component(props: Props): JSX.Element
{
    const {
        className = "record",
        id,
        cells = [],
        editable = false,
        onClick,
        onSaveButtonClick,
        onCancelButtonClick,
        onDeleteButtonClick
    } = props;

    return (
        <div
            className={`${className}${onClick ? "--interactable" : String.EMPTY}`}
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
                <div className={`${className}__control-box${editable ? "--active" : String.EMPTY}`}>
                    {
                        onSaveButtonClick &&
                        <Button
                            className={`${className}__ok-butotn`}
                            disabled={!editable}
                            icon={{name: Icomoon.CheckMark}}
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
                            className={`${className}__cancel-butotn`}
                            disabled={!editable}
                            icon={{name: Icomoon.XMark}}
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
                            className={`${className}__delete-butotn`}
                            disabled={!editable}
                            icon={{name: Icomoon.TrashCan}}
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

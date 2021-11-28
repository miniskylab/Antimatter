import {Button} from "@miniskylab/antimatter-button";
import {DatePicker, DatePickerProps} from "@miniskylab/antimatter-date-picker";
import {DropdownMenu, DropdownMenuProps} from "@miniskylab/antimatter-dropdown-menu";
import {InputField, InputFieldProps} from "@miniskylab/antimatter-input-field";
import {Label, LabelProps} from "@miniskylab/antimatter-label";
import {NumericInputField, NumericInputFieldProps} from "@miniskylab/antimatter-numeric-input-field";
import React, {Fragment} from "react";
import {RecordComponentProps} from "./models/record-component-props";
import {TabularRecordCancelButtonVariant, TabularRecordDeleteButtonVariant, TabularRecordOkButtonVariant} from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function RecordComponent(props: RecordComponentProps): JSX.Element
{
    let recordClassName = "record";
    if (props.onClick)
    {
        recordClassName += "--interactable";
    }

    let controlBoxClassName = "data-table__control-box";
    if (props.editable)
    {
        controlBoxClassName += "--active";
    }

    return (
        <div
            className={props.variant[recordClassName]}
            onClick={mouseEvent =>
            {
                mouseEvent.stopPropagation();
                props.onClick && props.onClick(props.id);
            }}
        >
            {
                props.cells.map((cell, cellIndex) => (
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
                (props.onSaveButtonClick || props.onCancelButtonClick || props.onDeleteButtonClick) &&
                <div className={props.variant[controlBoxClassName]}>
                    {
                        props.onSaveButtonClick &&
                        <Button
                            variant={TabularRecordOkButtonVariant}
                            disabled={!props.editable}
                            icon={"CheckMark"}
                            onClick={mouseEvent =>
                            {
                                mouseEvent.stopPropagation();
                                props.onSaveButtonClick(props.id);
                            }}
                        />
                    }
                    {
                        props.onCancelButtonClick &&
                        <Button
                            variant={TabularRecordCancelButtonVariant}
                            disabled={!props.editable}
                            icon={"XMark"}
                            onClick={mouseEvent =>
                            {
                                mouseEvent.stopPropagation();
                                props.onCancelButtonClick(props.id);
                            }}
                        />
                    }
                    {
                        props.onDeleteButtonClick &&
                        <Button
                            variant={TabularRecordDeleteButtonVariant}
                            disabled={!props.editable}
                            icon={"TrashCan"}
                            onClick={mouseEvent =>
                            {
                                mouseEvent.stopPropagation();
                                props.onDeleteButtonClick(props.id);
                            }}
                        />
                    }
                </div>
            }
        </div>
    );
}

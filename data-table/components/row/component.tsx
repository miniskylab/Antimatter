import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {DataTableRowProps, Mode} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className,
    cells = [],
    mode = Mode.ReadOnly,
    onClick,
    onChange
}: DataTableRowProps): JSX.Element
{
    return (
        <div className={bem(className, null, getModeModifier())} onClick={onClick}>
            {cells.map((cell, index) =>
            {
                return (
                    mode === Mode.Draft || mode === Mode.Edit
                        ? <InputField
                            key={index}
                            className={bem("DataTable-DataRow-CellInputField")}
                            value={cell}
                            autoFocus={index === 0}
                            onChange={newValue =>
                            {
                                const newRowData = {cells: [...cells]};
                                newRowData.cells[index] = newValue;

                                onChange(newRowData);
                            }}
                        />
                        : <Label key={index} className={bem("DataTable-Row-Cell")} text={cell}/>
                );
            })}
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
}

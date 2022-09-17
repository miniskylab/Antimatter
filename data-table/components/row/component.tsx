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
    values = [],
    placeholders = [],
    mode = Mode.ReadOnly,
    onClick,
    onChange
}: DataTableRowProps): JSX.Element
{
    return (
        <div className={bem(className, null, getModeModifier())} onClick={onClick}>
            {values.map((value, index) =>
            {
                return (
                    mode === Mode.Draft || mode === Mode.Edit
                        ? <InputField
                            key={index}
                            value={value}
                            className={bem("DataTable-Row-CellInputField")}
                            placeholder={placeholders[index]}
                            autoFocus={index === 0}
                            onChange={newValue => { onChange({values: values.map((oldValue, i) => i === index ? newValue : oldValue)}); }}
                        />
                        : <Label key={index} className={bem("DataTable-Row-CellLabel")} text={value}/>
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

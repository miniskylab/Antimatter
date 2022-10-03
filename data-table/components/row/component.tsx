import {Checkbox, Status} from "@miniskylab/antimatter-checkbox";
import {DropdownMenu} from "@miniskylab/antimatter-dropdown-menu";
import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
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
    columns = [],
    mode = Mode.ReadOnly,
    onClick,
    containerClassName,
    onChange
}: DataTableRowProps): JSX.Element
{
    return (
        <div className={bem(className, null, getModeModifier())} onClick={onClick}>
            {renderRows()}
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

    function renderRows(): JSX.Element[]
    {
        const rows = [];
        const columnCount = Math.max(columns.length, values.length);
        for (let index = 0; index < columnCount; index++)
        {
            const value = values[index];
            const column = columns[index];
            rows.push(
                (mode === Mode.Draft || mode === Mode.Edit) && !!column?.isEditable
                    ? renderEditor()
                    : renderValue()
            );

            function renderEditor(): JSX.Element
            {
                const dataType = column?.dataType;
                if (typeof dataType === "object")
                {
                    return (
                        <DropdownMenu
                            key={index}
                            selectedKeys={[value as string]}
                            containerClassName={containerClassName}
                            keyValueSet={dataType as Record<string, string>}
                            placeholder={column?.placeholder}
                            className={bem("DataTable-Row-CellDropdownMenu")}
                            onChange={newlySelectedKeys =>
                            {
                                const newValue = newlySelectedKeys[0];
                                onChange({values: values.map((oldValue, i) => i === index ? newValue : oldValue)});
                            }}
                        />
                    );
                }

                switch (dataType)
                {
                    case "boolean":
                    {
                        return (
                            <Checkbox
                                key={index}
                                className={bem("DataTable-Row-CellCheckbox")}
                                status={typeof value === "boolean" && value === true ? Status.Checked : Status.Unchecked}
                                onChange={newStatus =>
                                {
                                    const newValue = newStatus === Status.Checked;
                                    onChange({values: values.map((oldValue, i) => i === index ? newValue : oldValue)});
                                }}
                            />
                        );
                    }

                    default:
                    {
                        return (
                            <InputField
                                key={index}
                                value={value as string}
                                autoFocus={index === 0}
                                placeholder={column?.placeholder}
                                className={bem("DataTable-Row-CellInputField")}
                                onChange={newValue =>
                                {
                                    onChange({values: values.map((oldValue, i) => i === index ? newValue : oldValue)});
                                }}
                            />
                        );
                    }
                }
            }

            function renderValue(): JSX.Element
            {
                const dataType = column?.dataType;
                const modifier = mode === Mode.Draft || mode === Mode.Edit ? "CannotBeEdited" : String.EMPTY;
                if (typeof dataType === "object")
                {
                    const dropdownMenuValue = (dataType as Record<string, string>)[value as string];
                    return (<Label key={index} className={bem("DataTable-Row-CellLabel", null, modifier)} text={dropdownMenuValue}/>);
                }

                switch (dataType)
                {
                    case "boolean":
                    {
                        return (value as boolean) === true
                            ? <Icon key={index} className={bem("DataTable-Row-CellIcon", null, modifier)} name={Icomoon.CheckMark}/>
                            : <Label key={index} className={bem("DataTable-Row-CellLabel", null, modifier)} text={String.EMPTY}/>;
                    }

                    default:
                    {
                        return (<Label key={index} className={bem("DataTable-Row-CellLabel", null, modifier)} text={value as string}/>);
                    }
                }
            }
        }

        return rows;
    }
}

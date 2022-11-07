import {Checkbox, Status as CheckboxStatus} from "@miniskylab/antimatter-checkbox";
import {DropdownMenu, DropdownMenuProps, Status as DropdownMenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
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
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++)
        {
            const value = values[columnIndex];
            const column = columns[columnIndex];
            rows.push(
                mode === Mode.Draft || mode === Mode.Edit
                    ? renderEditor()
                    : renderValue()
            );

            function renderEditor(): JSX.Element
            {
                const dataType = column?.dataType;
                const dropdownMenuItems: DropdownMenuProps["menuItems"] = {};
                Object.keys(dataType).forEach(menuItemValue =>
                {
                    dropdownMenuItems[menuItemValue] = {
                        displayText: (dataType as Record<string, string>)[menuItemValue],
                        status: value === menuItemValue ? DropdownMenuItemStatus.Selected : undefined
                    };
                });

                if (typeof dataType === "object")
                {
                    return (
                        <DropdownMenu
                            key={columnIndex}
                            containerClassName={containerClassName}
                            menuItems={dropdownMenuItems}
                            placeholder={column?.placeholder}
                            className={bem("DataTable-Row-CellDropdownMenu")}
                            onClick={clickedMenuItemValue =>
                            {
                                const newValue = clickedMenuItemValue;
                                onChange({values: values.map((oldValue, i) => i === columnIndex ? newValue : oldValue)});
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
                                key={columnIndex}
                                className={bem("DataTable-Row-CellCheckbox")}
                                status={typeof value === "boolean" && value === true ? CheckboxStatus.Checked : CheckboxStatus.Unchecked}
                                onChange={newStatus =>
                                {
                                    const newValue = newStatus === CheckboxStatus.Checked;
                                    onChange({values: values.map((oldValue, i) => i === columnIndex ? newValue : oldValue)});
                                }}
                            />
                        );
                    }

                    default:
                    {
                        return (
                            <InputField
                                key={columnIndex}
                                value={value as string}
                                autoFocus={columnIndex === 0}
                                placeholder={column?.placeholder}
                                className={bem("DataTable-Row-CellInputField")}
                                onChange={newValue =>
                                {
                                    onChange({values: values.map((oldValue, i) => i === columnIndex ? newValue : oldValue)});
                                }}
                            />
                        );
                    }
                }
            }

            function renderValue(): JSX.Element
            {
                const dataType = column?.dataType;
                if (typeof dataType === "object")
                {
                    const stringValue = value as string;
                    const displayText = (dataType as Record<string, string>)[stringValue];
                    return (<Label key={columnIndex} className={bem("DataTable-Row-CellLabel")} text={displayText || stringValue}/>);
                }

                switch (dataType)
                {
                    case "boolean":
                    {
                        return (value as boolean) === true
                            ? <Icon key={columnIndex} className={bem("DataTable-Row-CellIcon")} name={Icomoon.CheckMark}/>
                            : <Label key={columnIndex} className={bem("DataTable-Row-CellLabel")} text={String.EMPTY}/>;
                    }

                    default:
                    {
                        return (<Label key={columnIndex} className={bem("DataTable-Row-CellLabel")} text={value as string}/>);
                    }
                }
            }
        }

        return rows;
    }
}

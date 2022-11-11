import {Checkbox, Status as CheckboxStatus} from "@miniskylab/antimatter-checkbox";
import {DropdownMenu, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
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
                switch (typeof value)
                {
                    case "object":
                    {
                        return (
                            <DropdownMenu
                                key={columnIndex}
                                containerClassName={containerClassName}
                                closeMenuAfterFirstSelection={true}
                                menuItems={value}
                                placeholder={column?.placeholder}
                                className={bem("DataTable-Row-CellDropdownMenu")}
                                onClick={clickedMenuItemValue =>
                                {
                                    const selectedMenuItemValues = Object.keys(value)
                                        .filter(menuItemValue => value[menuItemValue].status === MenuItemStatus.Selected);

                                    const newValue = {...value};
                                    selectedMenuItemValues.forEach(selectedMenuItemValue =>
                                    {
                                        const selectedMenuItem = newValue[selectedMenuItemValue];
                                        newValue[selectedMenuItemValue] = {
                                            ...selectedMenuItem,
                                            status: undefined
                                        };
                                    });

                                    const clickedMenuItem = value[clickedMenuItemValue];
                                    newValue[clickedMenuItemValue] = {
                                        ...clickedMenuItem,
                                        status: clickedMenuItem.status === undefined
                                            ? MenuItemStatus.Selected
                                            : clickedMenuItem.status === MenuItemStatus.Selected
                                                ? undefined
                                                : clickedMenuItem.status
                                    };

                                    onChange({values: values.map((oldValue, i) => i === columnIndex ? newValue : oldValue)});
                                }}
                            />
                        );
                    }

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

                    case "string":
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
                switch (typeof value)
                {
                    case "object":
                    {
                        const selectedMenuItemValue = Object.keys(value)
                            .find(menuItemValue => value[menuItemValue].status === MenuItemStatus.Selected);

                        const labelText = value[selectedMenuItemValue].displayText || selectedMenuItemValue;
                        return (<Label key={columnIndex} className={bem("DataTable-Row-CellLabel")} text={labelText}/>);
                    }

                    case "boolean":
                    {
                        return value === true
                            ? <Icon key={columnIndex} className={bem("DataTable-Row-CellIcon")} name={Icomoon.CheckMark}/>
                            : <Label key={columnIndex} className={bem("DataTable-Row-CellLabel")} text={String.EMPTY}/>;
                    }

                    case "string":
                    {
                        return (<Label key={columnIndex} className={bem("DataTable-Row-CellLabel")} text={value}/>);
                    }
                }
            }
        }

        return rows;
    }
}

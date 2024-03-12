import {DropdownMenuContextHook, DropdownMenuStyle} from "@miniskylab/antimatter-dropdown-menu";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {InputFieldContextHook, InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ToggleContextHook, ToggleStyle} from "@miniskylab/antimatter-toggle";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Row} from "../../components";
import {DataTableContextHook} from "../../hooks";
import {DataTableStyle} from "../../models";
import * as DataTableVariant from "../../variants";

const DataTable__Row__CellText: TextStyle = function (textProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const columnIndexContext = Row.ContextHook.useColumnIndexContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props).Row(rowContext.props, rowContext.state).CellText(textProps);

    return {
        ...inheritedStyle,
        ...columnIndexContext === 2 && {minWidth: 130},
        ...columnIndexContext === 3 && {
            flexGrow: 0.6,
            alignItems: "center"
        }
    };
};

const DataTable__Row__CellIcon: IconStyle = function (iconProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const columnIndexContext = Row.ContextHook.useColumnIndexContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props).Row(rowContext.props, rowContext.state).CellIcon(iconProps);

    return {
        ...inheritedStyle,
        ...columnIndexContext === 2 && {minWidth: 130},
        ...columnIndexContext === 3 && {
            flexGrow: 0.6,
            alignItems: "center"
        }
    };
};

const DataTable__Row__CellInputField__Root: ViewStyle = function (viewProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const columnIndexContext = Row.ContextHook.useColumnIndexContext();
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props)
        .Row(rowContext.props, rowContext.state)
        .CellInputField(inputFieldContext.props)
        .Root(viewProps);

    return {
        ...inheritedStyle,
        ...columnIndexContext === 2 && {minWidth: 130},
        ...columnIndexContext === 3 && {
            flexGrow: 0.6,
            alignItems: "center"
        }
    };
};

const DataTable__Row__CellInputField: InputFieldStyle = function (inputFieldProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props).Row(rowContext.props, rowContext.state)
        .CellInputField(inputFieldProps);

    return {
        ...inheritedStyle,
        Root: DataTable__Row__CellInputField__Root
    };
};

const DataTable__Row__CellDropdownMenu__Root: ViewStyle = function (viewProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const columnIndexContext = Row.ContextHook.useColumnIndexContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props)
        .Row(rowContext.props, rowContext.state)
        .CellDropdownMenu(dropdownMenuContext.props)
        .Root(viewProps);

    return {
        ...inheritedStyle,
        ...columnIndexContext === 2 && {minWidth: 140},
        ...columnIndexContext === 3 && {
            flexGrow: 0.6,
            alignItems: "center"
        }
    };
};

const DataTable__Row__CellDropdownMenu: DropdownMenuStyle = function (dropdownMenuProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props).Row(rowContext.props, rowContext.state)
        .CellDropdownMenu(dropdownMenuProps);

    return {
        ...inheritedStyle,
        Root: DataTable__Row__CellDropdownMenu__Root
    };
};

const DataTable__Row__CellToggle__Root: ViewStyle = function (viewProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const toggleContext = ToggleContextHook.useToggleContext();
    const columnIndexContext = Row.ContextHook.useColumnIndexContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props)
        .Row(rowContext.props, rowContext.state)
        .CellToggle(toggleContext.props)
        .Root(viewProps);

    return {
        ...inheritedStyle,
        ...columnIndexContext === 2 && {minWidth: 130},
        ...columnIndexContext === 3 && {
            flexGrow: 0.6,
            alignItems: "center"
        }
    };
};

const DataTable__Row__CellToggle: ToggleStyle = function (toggleProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props).Row(rowContext.props, rowContext.state).CellToggle(toggleProps);

    return {
        ...inheritedStyle,
        Root: DataTable__Row__CellToggle__Root
    };
};

const DataTable__Row: Row.Style = function (rowProps, rowState)
{
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props).Row(rowProps, rowState);

    return {
        ...inheritedStyle,
        CellText: DataTable__Row__CellText,
        CellIcon: DataTable__Row__CellIcon,
        CellInputField: DataTable__Row__CellInputField,
        CellDropdownMenu: DataTable__Row__CellDropdownMenu,
        CellToggle: DataTable__Row__CellToggle
    };
};

export const Default: DataTableStyle = function (dataTableProps)
{
    return {
        ...DataTableVariant.Default(dataTableProps),
        Row: DataTable__Row
    };
};

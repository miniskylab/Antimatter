import {DropdownMenuContextHook, type DropdownMenuStyle} from "@miniskylab/antimatter-dropdown-menu";
import {type IconStyle} from "@miniskylab/antimatter-icon";
import {InputFieldContextHook, type InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {type TextStyle} from "@miniskylab/antimatter-text";
import {ToggleContextHook, type ToggleStyle} from "@miniskylab/antimatter-toggle";
import {type ViewStyle} from "@miniskylab/antimatter-view";
import {Row} from "../../components";
import {DataTableContextHook} from "../../hooks";
import {type DataTableStyle} from "../../models";
import * as DataTableVariant from "../../variants";

const DataTable__DataRow__CellText: TextStyle = function (textProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const columnIndexContext = Row.ContextHook.useColumnIndexContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props).DataRow(rowContext.props, rowContext.state).CellText(textProps);

    return {
        ...inheritedStyle,
        ...columnIndexContext === 2 && {minWidth: 130},
        ...columnIndexContext === 3 && {
            flexGrow: 0.6,
            textAlign: "center"
        }
    };
};

const DataTable__DataRow__CellIcon: IconStyle = function (iconProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const columnIndexContext = Row.ContextHook.useColumnIndexContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props).DataRow(rowContext.props, rowContext.state).CellIcon(iconProps);

    return {
        ...inheritedStyle,
        ...columnIndexContext === 2 && {minWidth: 130},
        ...columnIndexContext === 3 && {
            flexGrow: 0.6,
            alignItems: "center"
        }
    };
};

const DataTable__DataRow__CellInputField__Root: ViewStyle = function (viewProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const columnIndexContext = Row.ContextHook.useColumnIndexContext();
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props)
        .DataRow(rowContext.props, rowContext.state)
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

const DataTable__DataRow__CellInputField: InputFieldStyle = function (inputFieldProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props)
        .DataRow(rowContext.props, rowContext.state)
        .CellInputField(inputFieldProps);

    return {
        ...inheritedStyle,
        Root: DataTable__DataRow__CellInputField__Root
    };
};

const DataTable__DataRow__CellDropdownMenu__Root: ViewStyle = function (viewProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const columnIndexContext = Row.ContextHook.useColumnIndexContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props)
        .DataRow(rowContext.props, rowContext.state)
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

const DataTable__DataRow__CellDropdownMenu: DropdownMenuStyle = function (dropdownMenuProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props)
        .DataRow(rowContext.props, rowContext.state)
        .CellDropdownMenu(dropdownMenuProps);

    return {
        ...inheritedStyle,
        Root: DataTable__DataRow__CellDropdownMenu__Root
    };
};

const DataTable__DataRow__CellToggle__Root: ViewStyle = function (viewProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const toggleContext = ToggleContextHook.useToggleContext();
    const columnIndexContext = Row.ContextHook.useColumnIndexContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props)
        .DataRow(rowContext.props, rowContext.state)
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

const DataTable__DataRow__CellToggle: ToggleStyle = function (toggleProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props)
        .DataRow(rowContext.props, rowContext.state)
        .CellToggle(toggleProps);

    return {
        ...inheritedStyle,
        Root: DataTable__DataRow__CellToggle__Root
    };
};

const DataTable__DataRow: Row.Style = function (rowProps, rowState)
{
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props).DataRow(rowProps, rowState);

    return {
        ...inheritedStyle,
        CellText: DataTable__DataRow__CellText,
        CellIcon: DataTable__DataRow__CellIcon,
        CellInputField: DataTable__DataRow__CellInputField,
        CellDropdownMenu: DataTable__DataRow__CellDropdownMenu,
        CellToggle: DataTable__DataRow__CellToggle
    };
};

const DataTable__HeaderRow__CellText: TextStyle = function (textProps)
{
    const rowContext = Row.ContextHook.useRowContext();
    const columnIndexContext = Row.ContextHook.useColumnIndexContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props)
        .HeaderRow(rowContext.props, rowContext.state)
        .CellText(textProps);

    return {
        ...inheritedStyle,
        ...columnIndexContext === 2 && {minWidth: 130},
        ...columnIndexContext === 3 && {
            flexGrow: 0.6,
            textAlign: "center"
        }
    };
};

const DataTable__HeaderRow: Row.Style = function (rowProps, rowState)
{
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = DataTableVariant.Default(dataTableContext.props).HeaderRow(rowProps, rowState);

    return {
        ...inheritedStyle,
        CellText: DataTable__HeaderRow__CellText
    };
};

export const Default: DataTableStyle = function (dataTableProps)
{
    return {
        ...DataTableVariant.Default(dataTableProps),
        DataRow: DataTable__DataRow,
        HeaderRow: DataTable__HeaderRow
    };
};

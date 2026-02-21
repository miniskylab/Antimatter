import {ButtonContextHook, type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {DropDirection, DropdownMenuContextHook, type DropdownMenuStyle, DropdownMenuVariant} from "@miniskylab/antimatter-dropdown-menu";
import {CursorType, Layer, useEnvironment} from "@miniskylab/antimatter-framework";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {InputFieldContextHook, type InputFieldStyle, InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {PressableContextHook, type PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {type ScrollViewStyle, ScrollViewVariant} from "@miniskylab/antimatter-scroll-view";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type TextInputStyle} from "@miniskylab/antimatter-text-input";
import {ToggleContextHook, type ToggleStyle, ToggleVariant} from "@miniskylab/antimatter-toggle";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {Row} from "../components";
import {DataTableContextHook} from "../hooks";
import {type DataTableStyle} from "../models";

const DataTable__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        flexDirection: "column",
        minWidth: 390,
        height: 610,
        paddingTop: 10,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        backgroundColor: Color.Background
    };
};

const DataTable__ControlPanel: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: 45,
        paddingRigh: 3,
        marginTop: 5,
        marginBottom: 10,
        userSelect: "none"
    };
};

const DataTable__TitleContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        alignItems: "flex-start",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden"
    };
};

const DataTable__MainTitle: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        lineHeight: 25,
        fontSize: 20,
        fontWeight: "bold",
        color: Color.White
    };
};

const DataTable__Subtitle: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        lineHeight: 20,
        fontSize: 14,
        color: Color.Neutral
    };
};

const DataTable__Button1__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flexDirection: "column",
        minWidth: 45,
        height: 45,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 15,
        borderWidth: 0,
        backgroundColor: Color.Transparent,
        ...dataTableContext.props.mode === Row.Mode.Draft && {opacity: 1}
    };
};

const DataTable__Button1__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        flex: 1,
        fontSize: 24,
        color: Color.Neutral,
        ...dataTableContext.props.mode === Row.Mode.Draft && {color: Color.Blue},
        ...dataTableContext.props.mode === Row.Mode.Edit && {color: Color.Blue},
        ...dataTableContext.props.mode === Row.Mode.Delete && {color: Color.Red},
        ...pressableContext.state.hovered && {color: Color.White},
        ...pressableContext.state.pressed && {color: Color.Gray}
    };
};

const DataTable__Button1__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(textProps);

    return {
        ...inheritedStyle,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        lineHeight: 12,
        fontSize: 12,
        fontWeight: "bold",
        color: Color.Neutral,
        ...dataTableContext.props.mode === Row.Mode.Draft && {color: Color.Blue},
        ...dataTableContext.props.mode === Row.Mode.Edit && {color: Color.Blue},
        ...dataTableContext.props.mode === Row.Mode.Delete && {color: Color.Red},
        ...pressableContext.state.hovered && {color: Color.White},
        ...pressableContext.state.pressed && {color: Color.Gray}
    };
};

const DataTable__Button1: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: DataTable__Button1__Root,
        Icon: DataTable__Button1__Icon,
        Label: DataTable__Button1__Label
    };
};

const DataTable__Button2__Root: PressableStyle = function (pressableProps, pressableState)
{
    return {
        ...DataTable__Button1__Root(pressableProps, pressableState),
        minWidth: 70
    };
};

const DataTable__Button2__Icon: IconStyle = function (iconProps)
{
    const pressableContext = PressableContextHook.usePressableContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    return {
        ...DataTable__Button1__Icon(iconProps),
        ...dataTableContext.props.mode === Row.Mode.Draft && {color: Color.Blue__a65},
        ...dataTableContext.props.mode === Row.Mode.Edit && {color: Color.Blue},
        ...dataTableContext.props.mode === Row.Mode.Delete && {color: Color.Red},
        ...pressableContext.state.hovered && {color: Color.White},
        ...pressableContext.state.pressed && {color: Color.Gray}
    };
};

const DataTable__Button2__Label: TextStyle = function (textProps)
{
    const pressableContext = PressableContextHook.usePressableContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();

    return {
        ...DataTable__Button1__Label(textProps),
        ...dataTableContext.props.mode === Row.Mode.Draft && {color: Color.Blue__a65},
        ...dataTableContext.props.mode === Row.Mode.Edit && {color: Color.Blue},
        ...dataTableContext.props.mode === Row.Mode.Delete && {color: Color.Red},
        ...pressableContext.state.hovered && {color: Color.White},
        ...pressableContext.state.pressed && {color: Color.Gray}
    };
};

const DataTable__Button2: ButtonStyle = function (buttonProps)
{
    return {
        ...DataTable__Button1(buttonProps),
        Root: DataTable__Button2__Root,
        Icon: DataTable__Button2__Icon,
        Label: DataTable__Button2__Label
    };
};

const DataTable__Button3__Icon: IconStyle = function (iconProps)
{
    const pressableContext = PressableContextHook.usePressableContext();

    return {
        ...DataTable__Button1__Icon(iconProps),
        color: Color.Neutral,
        ...pressableContext.state.hovered && {color: Color.White},
        ...pressableContext.state.pressed && {color: Color.Gray}
    };
};

const DataTable__Button3__Label: TextStyle = function (textProps)
{
    const pressableContext = PressableContextHook.usePressableContext();

    return {
        ...DataTable__Button1__Label(textProps),
        color: Color.Neutral,
        ...pressableContext.state.hovered && {color: Color.White},
        ...pressableContext.state.pressed && {color: Color.Gray}
    };
};

const DataTable__Button3: ButtonStyle = function (buttonProps)
{
    return {
        ...DataTable__Button1(buttonProps),
        Icon: DataTable__Button3__Icon,
        Label: DataTable__Button3__Label
    };
};

const DataTable__Scroll: ScrollViewStyle = function (scrollViewProps)
{
    return {
        ...ScrollViewVariant.Default(scrollViewProps),
        alignSelf: "stretch",
        backgroundColor: Color.Ambient
    };
};

const DataTable__Hr: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        height: 2,
        backgroundColor: Color.Neutral
    };
};

const DataTable__DataRow__Root: PressableStyle = function (pressableProps, pressableState)
{
    const rowContext = Row.ContextHook.useRowContext();

    const isRunningOnMobileApp = useEnvironment("MobileApp");
    const isPressableAndHovered = rowContext.props.onPress && pressableState.hovered;

    return {
        ...PressableVariant.Default(pressableProps, pressableState),
        flexDirection: "row",
        alignItems: "stretch",
        gap: 10,
        height: 42,
        paddingHorizontal: 12,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Neutral,
        marginTop: isRunningOnMobileApp ? -2 : -1.6,
        cursor: isPressableAndHovered ? CursorType.Pointer : CursorType.Default,
        zIndex: rowContext.props.mode !== Row.Mode.ReadOnly
            ? Layer.AlwaysOnTop
            : pressableState.hovered
                ? Layer.Higher
                : Layer.Default,
        ...(isPressableAndHovered || rowContext.props.mode === Row.Mode.Draft || rowContext.props.mode === Row.Mode.Edit) && {
            backgroundColor: Color.Blue__a10,
            borderColor: Color.Blue
        },
        ...rowContext.props.mode === Row.Mode.Delete && {
            backgroundColor: Color.Red__a10,
            borderColor: Color.Red
        }
    };
};

const DataTable__DataRow__CellText: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        flex: 1,
        alignItems: "flex-start",
        fontSize: 16,
        color: Color.Neutral
    };
};

const DataTable__DataRow__CellIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        flex: 1,
        color: Color.Neutral,
        fontSize: 16
    };
};

const DataTable__DataRow__CellInputField__Root: PressableStyle = function (pressableProps, pressableState)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flex: 1,
        height: "100%",
        backgroundColor: Color.Transparent
    };
};

const DataTable__DataRow__CellInputField__TextBox: TextInputStyle = function (textInputProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).TextBox(textInputProps);

    return {
        ...inheritedStyle,
        animations: undefined,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 16
    };
};

const DataTable__DataRow__CellInputField__Placeholder: TextStyle = function (textProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Placeholder(textProps);

    return {
        ...inheritedStyle,
        animations: undefined,
        display: inputFieldContext.props.value ? "none" : "flex",
        height: "100%",
        paddingLeft: 0,
        fontSize: 16,
        fontStyle: "italic"
    };
};

const DataTable__DataRow__CellInputField: InputFieldStyle = function (inputFieldProps)
{
    return {
        ...InputFieldVariant.Default(inputFieldProps),
        Root: DataTable__DataRow__CellInputField__Root,
        TextBox: DataTable__DataRow__CellInputField__TextBox,
        Placeholder: DataTable__DataRow__CellInputField__Placeholder
    };
};

const DataTable__DataRow__CellDropdownMenu__Root: ViewStyle = function (viewProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        flex: 1,
        width: undefined,
        marginLeft: -10,
        paddingLeft: 10
    };
};

const DataTable__DataRow__CellDropdownMenu__SelectedItemContainer: PressableStyle = function (pressableProps, pressableState)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).SelectedItemContainer(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        height: "100%",
        alignItems: "center",
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderWidth: 0,
        backgroundColor: Color.Transparent
    };
};

const DataTable__DataRow__CellDropdownMenu__SelectedItem: TextStyle = function (textProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).SelectedItem(textProps);

    return {
        ...inheritedStyle,
        height: "100%",
        lineHeight: undefined,
        paddingVertical: 0,
        paddingLeft: 0,
        paddingRight: 10,
        fontSize: 16,
        color: Color.Neutral,
        backgroundColor: Color.Transparent
    };
};

const DataTable__DataRow__CellDropdownMenu__Caret: ViewStyle = function (viewProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Caret(viewProps);

    return {
        ...inheritedStyle,
        top: 17
    };
};

const DataTable__DataRow__CellDropdownMenu__Menu: ScrollViewStyle = function (scrollViewProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Menu(scrollViewProps);

    return {
        ...inheritedStyle,
        left: 0,
        maxHeight: 175,
        marginTop: 3,
        shadowOffset: {width: 0, height: dropdownMenuContext.props.dropDirection === DropDirection.Down ? 15 : -15},
        shadowRadius: 30,
        shadowColor: Color.Black,
        shadowOpacity: 1
    };
};

const DataTable__DataRow__CellDropdownMenu__MenuItem__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props)
        .MenuItem(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        minWidth: undefined,
        paddingLeft: 10
    };
};

const DataTable__DataRow__CellDropdownMenu__MenuItem__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props)
        .MenuItem(buttonContext.props)
        .Label(textProps);

    return {
        ...inheritedStyle,
        fontSize: 16
    };
};

const DataTable__DataRow__CellDropdownMenu__MenuItem: ButtonStyle = function (buttonProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).MenuItem(buttonProps);

    return {
        ...inheritedStyle,
        Root: DataTable__DataRow__CellDropdownMenu__MenuItem__Root,
        Label: DataTable__DataRow__CellDropdownMenu__MenuItem__Label
    };
};

const DataTable__DataRow__CellDropdownMenu__Placeholder: TextStyle = function (textProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Placeholder(textProps);

    return {
        ...inheritedStyle,
        height: "100%",
        fontSize: 16,
        fontStyle: "italic",
        color: Color.Gray
    };
};

const DataTable__DataRow__CellDropdownMenu: DropdownMenuStyle = function (dropdownMenuProps)
{
    return {
        ...DropdownMenuVariant.Default(dropdownMenuProps),
        Root: DataTable__DataRow__CellDropdownMenu__Root,
        SelectedItemContainer: DataTable__DataRow__CellDropdownMenu__SelectedItemContainer,
        SelectedItem: DataTable__DataRow__CellDropdownMenu__SelectedItem,
        Caret: DataTable__DataRow__CellDropdownMenu__Caret,
        Menu: DataTable__DataRow__CellDropdownMenu__Menu,
        MenuItem: DataTable__DataRow__CellDropdownMenu__MenuItem,
        Placeholder: DataTable__DataRow__CellDropdownMenu__Placeholder
    };
};

const DataTable__DataRow__CellToggle__Root: ViewStyle = function (viewProps)
{
    const toggleContext = ToggleContextHook.useToggleContext();

    const inheritedStyle = ToggleVariant.Checkbox(toggleContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        flex: 1
    };
};

const DataTable__DataRow__CellToggle: ToggleStyle = function (toggleProps)
{
    return {
        ...ToggleVariant.Checkbox(toggleProps),
        Root: DataTable__DataRow__CellToggle__Root
    };
};

const DataTable__DataRow: Row.Style = function ()
{
    return {
        Root: DataTable__DataRow__Root,
        CellText: DataTable__DataRow__CellText,
        CellIcon: DataTable__DataRow__CellIcon,
        CellInputField: DataTable__DataRow__CellInputField,
        CellDropdownMenu: DataTable__DataRow__CellDropdownMenu,
        CellToggle: DataTable__DataRow__CellToggle
    };
};

const DataTable__HeaderRow__Root: PressableStyle = function (pressableProps, pressableState)
{
    return {
        ...DataTable__DataRow__Root(pressableProps, pressableState),
        alignSelf: "stretch",
        height: 40,
        backgroundColor: Color.Ambient,
        borderTopWidth: 0,
        borderBottomWidth: 0
    };
};

const DataTable__HeaderRow__CellText: TextStyle = function (textProps)
{
    return {
        ...DataTable__DataRow__CellText(textProps),
        color: Color.White,
        fontWeight: "bold"
    };
};

const DataTable__HeaderRow: Row.Style = function (rowProps, rowState)
{
    return {
        ...DataTable__DataRow(rowProps, rowState),
        Root: DataTable__HeaderRow__Root,
        CellText: DataTable__HeaderRow__CellText
    };
};

const DataTable__EmptyRow__Root: PressableStyle = function (pressableProps, pressableState)
{
    return {
        ...DataTable__DataRow__Root(pressableProps, pressableState),
        pointerEvents: "none"
    };
};

const DataTable__EmptyRow: Row.Style = function (rowProps, rowState)
{
    return {
        ...DataTable__DataRow(rowProps, rowState),
        Root: DataTable__EmptyRow__Root
    };
};

export const Default: DataTableStyle = function ()
{
    return {
        Root: DataTable__Root,
        ControlPanel: DataTable__ControlPanel,
        TitleContainer: DataTable__TitleContainer,
        MainTitle: DataTable__MainTitle,
        Subtitle: DataTable__Subtitle,
        Button1: DataTable__Button1,
        Button2: DataTable__Button2,
        Button3: DataTable__Button3,
        Scroll: DataTable__Scroll,
        Hr: DataTable__Hr,
        DataRow: DataTable__DataRow,
        EmptyRow: DataTable__EmptyRow,
        HeaderRow: DataTable__HeaderRow
    };
};

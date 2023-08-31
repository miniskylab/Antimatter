import {ButtonContextHook, ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {DropDirection, DropdownMenuContextHook, DropdownMenuStyle, DropdownMenuVariant} from "@miniskylab/antimatter-dropdown-menu";
import {Environment, Layer, useEnvironment} from "@miniskylab/antimatter-framework";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {InputFieldContextHook, InputFieldStyle, InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {PressableContextHook, PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {ScrollViewStyle, ScrollViewVariant} from "@miniskylab/antimatter-scroll-view";
import {TextInputStyle} from "@miniskylab/antimatter-text-input";
import {ToggleContextHook, ToggleStyle, ToggleVariant} from "@miniskylab/antimatter-toggle";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {Row} from "../component";
import {DataTableContextHook} from "../hook";
import {DataTableStyle} from "../model";

const DataTable__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        flexDirection: "column",
        minWidth: 400,
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

const DataTable__MainTitle: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        lineHeight: 25,
        fontSize: 20,
        fontWeight: "bold",
        color: Color.White
    };
};

const DataTable__SubTitle: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        lineHeight: 20,
        fontSize: 14,
        color: Color.Neutral
    };
};

const DataTable__ControlButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();
    const controlButtonTypeContext = DataTableContextHook.useControlButtonTypeContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flexDirection: "column",
        minWidth: controlButtonTypeContext === "mode" ? 70 : 45,
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

const DataTable__ControlButton__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();
    const controlButtonTypeContext = DataTableContextHook.useControlButtonTypeContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        flex: 1,
        fontSize: 24,
        color: Color.Neutral,
        ...dataTableContext.props.mode === Row.Mode.Draft && {
            ...controlButtonTypeContext === "action" && {color: Color.Primary},
            ...controlButtonTypeContext === "mode" && {color: Color.Primary__a65}
        },
        ...dataTableContext.props.mode === Row.Mode.Edit && {
            ...controlButtonTypeContext === "action" && {color: Color.Primary},
            ...controlButtonTypeContext === "mode" && {color: Color.Primary}
        },
        ...dataTableContext.props.mode === Row.Mode.Delete && {
            ...controlButtonTypeContext === "action" && {color: Color.Negative},
            ...controlButtonTypeContext === "mode" && {color: Color.Negative}
        },
        ...pressableContext.state.hovered && {color: Color.White},
        ...pressableContext.state.pressed && {color: Color.Gray}
    };
};

const DataTable__ControlButton__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const dataTableContext = DataTableContextHook.useDataTableContext();
    const controlButtonTypeContext = DataTableContextHook.useControlButtonTypeContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(labelProps);

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
        ...dataTableContext.props.mode === Row.Mode.Draft && {
            ...controlButtonTypeContext === "action" && {color: Color.Primary},
            ...controlButtonTypeContext === "mode" && {color: Color.Primary__a65}
        },
        ...dataTableContext.props.mode === Row.Mode.Edit && {
            ...controlButtonTypeContext === "action" && {color: Color.Primary},
            ...controlButtonTypeContext === "mode" && {color: Color.Primary}
        },
        ...dataTableContext.props.mode === Row.Mode.Delete && {
            ...controlButtonTypeContext === "action" && {color: Color.Negative},
            ...controlButtonTypeContext === "mode" && {color: Color.Negative}
        },
        ...pressableContext.state.hovered && {color: Color.White},
        ...pressableContext.state.pressed && {color: Color.Gray}
    };
};

const DataTable__ControlButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: DataTable__ControlButton__Root,
        Icon: DataTable__ControlButton__Icon,
        Label: DataTable__ControlButton__Label
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

const DataTable__Row__Root: PressableStyle = function (pressableProps, pressableState)
{
    const rowContext = Row.ContextHook.useRowContext();
    const rowTypeContext = DataTableContextHook.useRowTypeContext();

    const runningOnMobileApp = useEnvironment(Environment.MobileApp);
    const selectableAndHovered = rowContext.props.onPress && pressableState.hovered;

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
        marginTop: runningOnMobileApp ? -2 : -1.6,
        cursor: selectableAndHovered ? "pointer" : "default",
        zIndex: rowContext.props.mode !== Row.Mode.ReadOnly
            ? Layer.AlwaysOnTop
            : pressableState.hovered
                ? Layer.Higher
                : Layer.Default,
        ...(selectableAndHovered || rowContext.props.mode === Row.Mode.Draft || rowContext.props.mode === Row.Mode.Edit) && {
            backgroundColor: Color.Primary__a10,
            borderColor: Color.Primary
        },
        ...rowContext.props.mode === Row.Mode.Delete && {
            backgroundColor: Color.Negative__a10,
            borderColor: Color.Negative
        },
        ...rowTypeContext === "header" && {
            alignSelf: "stretch",
            height: 40,
            backgroundColor: Color.Ambient,
            borderTopWidth: 0,
            borderBottomWidth: 0
        },
        ...rowTypeContext === "empty" && {
            pointerEvents: "none"
        }
    };
};

const DataTable__Row__CellLabel: LabelStyle = function (labelProps)
{
    const rowTypeContext = DataTableContextHook.useRowTypeContext();

    return {
        ...LabelVariant.Default(labelProps),
        flex: 1,
        alignItems: "flex-start",
        fontSize: 16,
        color: Color.Neutral,
        ...rowTypeContext === "header" && {
            color: Color.White,
            fontWeight: "bold"
        }
    };
};

const DataTable__Row__CellIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        flex: 1,
        color: Color.Neutral,
        fontSize: 16
    };
};

const DataTable__Row__CellInputField__Root: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        flex: 1,
        height: "100%",
        backgroundColor: Color.Transparent
    };
};

const DataTable__Row__CellInputField__TextBox: TextInputStyle = function (textInputProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).TextBox(textInputProps);

    return {
        ...inheritedStyle,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 16
    };
};

const DataTable__Row__CellInputField__Placeholder: LabelStyle = function (labelProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Placeholder(labelProps);

    return {
        ...inheritedStyle,
        display: inputFieldContext.props.value ? "none" : "flex",
        fontStyle: "italic",
        paddingLeft: 0
    };
};

const DataTable__Row__CellInputField: InputFieldStyle = function (inputFieldProps)
{
    return {
        ...InputFieldVariant.Default(inputFieldProps),
        Root: DataTable__Row__CellInputField__Root,
        TextBox: DataTable__Row__CellInputField__TextBox,
        Placeholder: DataTable__Row__CellInputField__Placeholder
    };
};

const DataTable__Row__CellDropdownMenu__Root: ViewStyle = function (viewProps)
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

const DataTable__Row__CellDropdownMenu__SelectedItemContainer: PressableStyle = function (pressableProps, pressableState)
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

const DataTable__Row__CellDropdownMenu__SelectedItem: LabelStyle = function (labelProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).SelectedItem(labelProps);

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

const DataTable__Row__CellDropdownMenu__Caret: ViewStyle = function (viewProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Caret(viewProps);

    return {
        ...inheritedStyle,
        top: 17
    };
};

const DataTable__Row__CellDropdownMenu__Menu: ScrollViewStyle = function (scrollViewProps)
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

const DataTable__Row__CellDropdownMenu__MenuItem__Root: PressableStyle = function (pressableProps, pressableState)
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

const DataTable__Row__CellDropdownMenu__MenuItem__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props)
        .MenuItem(buttonContext.props)
        .Label(labelProps);

    return {
        ...inheritedStyle,
        fontSize: 16
    };
};

const DataTable__Row__CellDropdownMenu__MenuItem: ButtonStyle = function (buttonProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).MenuItem(buttonProps);

    return {
        ...inheritedStyle,
        Root: DataTable__Row__CellDropdownMenu__MenuItem__Root,
        Label: DataTable__Row__CellDropdownMenu__MenuItem__Label
    };
};

const DataTable__Row__CellDropdownMenu__Placeholder: LabelStyle = function (labelProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Placeholder(labelProps);

    return {
        ...inheritedStyle,
        height: "100%",
        fontSize: 16,
        fontStyle: "italic",
        color: Color.Gray
    };
};

const DataTable__Row__CellDropdownMenu: DropdownMenuStyle = function (dropdownMenuProps)
{
    return {
        ...DropdownMenuVariant.Default(dropdownMenuProps),
        Root: DataTable__Row__CellDropdownMenu__Root,
        SelectedItemContainer: DataTable__Row__CellDropdownMenu__SelectedItemContainer,
        SelectedItem: DataTable__Row__CellDropdownMenu__SelectedItem,
        Caret: DataTable__Row__CellDropdownMenu__Caret,
        Menu: DataTable__Row__CellDropdownMenu__Menu,
        MenuItem: DataTable__Row__CellDropdownMenu__MenuItem,
        Placeholder: DataTable__Row__CellDropdownMenu__Placeholder
    };
};

const DataTable__Row__CellToggle__Root: ViewStyle = function (viewProps)
{
    const toggleContext = ToggleContextHook.useToggleContext();

    const inheritedStyle = ToggleVariant.Checkbox(toggleContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        flex: 1
    };
};

const DataTable__Row__CellToggle: ToggleStyle = function (toggleProps)
{
    return {
        ...ToggleVariant.Checkbox(toggleProps),
        Root: DataTable__Row__CellToggle__Root
    };
};

const DataTable__Row: Row.Style = function ()
{
    return {
        Root: DataTable__Row__Root,
        CellLabel: DataTable__Row__CellLabel,
        CellIcon: DataTable__Row__CellIcon,
        CellInputField: DataTable__Row__CellInputField,
        CellDropdownMenu: DataTable__Row__CellDropdownMenu,
        CellToggle: DataTable__Row__CellToggle
    };
};

const DataTable__AddNewButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const runningOnMobileApp = useEnvironment(Environment.MobileApp);

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        alignSelf: "stretch",
        height: 42,
        borderWidth: 0,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: pressableState.hovered || pressableState.pressed ? Color.Primary : Color.Neutral,
        zIndex: pressableState.hovered ? Layer.Higher : Layer.Default,
        marginTop: runningOnMobileApp ? -2 : -1.6,
        opacity: 1
    };
};

const DataTable__AddNewButton__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        height: "100%",
        fontSize: 20,
        color: buttonContext.props.disabled
            ? Color.Gray__a65
            : pressableContext.state.pressed
                ? Color.Ambient
                : pressableContext.state.hovered
                    ? Color.White
                    : Color.Neutral
    };
};

const DataTable__AddNewButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: DataTable__AddNewButton__Root,
        Icon: DataTable__AddNewButton__Icon
    };
};

export const Default: DataTableStyle = function ()
{
    return {
        Root: DataTable__Root,
        ControlPanel: DataTable__ControlPanel,
        TitleContainer: DataTable__TitleContainer,
        MainTitle: DataTable__MainTitle,
        SubTitle: DataTable__SubTitle,
        ControlButton: DataTable__ControlButton,
        Scroll: DataTable__Scroll,
        Hr: DataTable__Hr,
        Row: DataTable__Row,
        AddNewButton: DataTable__AddNewButton
    };
};

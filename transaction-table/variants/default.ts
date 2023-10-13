import {ButtonContextHook, ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {CalendarContextHook, CalendarStyle, CalendarVariant} from "@miniskylab/antimatter-calendar";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {DatePickerContextHook, DatePickerStyle, DatePickerVariant} from "@miniskylab/antimatter-date-picker";
import {DropdownMenuContextHook, DropdownMenuStyle, DropdownMenuVariant, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {Environment, Style} from "@miniskylab/antimatter-framework";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {InputFieldContextHook, InputFieldStyle, InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {NumericInputFieldContextHook, NumericInputFieldStyle, NumericInputFieldVariant} from "@miniskylab/antimatter-numeric-input-field";
import {PressableContextHook, PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {ScrollViewStyle, ScrollViewVariant} from "@miniskylab/antimatter-scroll-view";
import {TextInputStyle} from "@miniskylab/antimatter-text-input";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {Summary, TransactionRecord} from "../components";
import {TransactionTableContextHook} from "../hooks";
import {TransactionTableStyle} from "../models";

const TransactionTable__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "center",
        minWidth: 300,
        maxWidth: 1000,
        minHeight: 500,
        ...Environment.useResponsiveStyle("Large", {
            flexDirection: "row",
            alignItems: "flex-start"
        })
    };
};

const TransactionTable__Calendar__Root: ViewStyle = function (viewProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = CalendarVariant.Sesquialteral(calendarContext.props, calendarContext.state).Root(viewProps);

    return {
        ...inheritedStyle,
        display: "flex",
        marginRight: 20
    };
};

const TransactionTable__Calendar: CalendarStyle = function (calendarProps, calendarState)
{
    return {
        ...CalendarVariant.Sesquialteral(calendarProps, calendarState),
        Root: TransactionTable__Calendar__Root
    };
};

const TransactionTable__DatePicker__Root: ViewStyle = function (viewProps)
{
    const datePickerContext = DatePickerContextHook.useDatePickerContext();

    const inheritedStyle = DatePickerVariant.Default(datePickerContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        width: 276,
        height: 34,
        marginBottom: 5,
        ...datePickerContext.props.calendarIsOpen && {
            shadowOffset: {width: 0, height: 10},
            shadowRadius: 20,
            shadowColor: Color.Black,
            shadowOpacity: 1,
            zIndex: Style.Layer.AlwaysOnTop
        }
    };
};

const TransactionTable__DatePicker__InputField__TextBox: TextInputStyle = function (textInputProps)
{
    const datePickerContext = DatePickerContextHook.useDatePickerContext();
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = DatePickerVariant.Default(datePickerContext.props)
        .InputField(inputFieldContext.props)
        .TextBox(textInputProps);

    return {
        ...inheritedStyle,
        paddingRight: 12,
        backgroundColor: Color.Background,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    };
};

const TransactionTable__DatePicker__InputField: InputFieldStyle = function (inputFieldProps)
{
    const datePickerContext = DatePickerContextHook.useDatePickerContext();

    const inheritedStyle = DatePickerVariant.Default(datePickerContext.props).InputField(inputFieldProps);

    return {
        ...inheritedStyle,
        TextBox: TransactionTable__DatePicker__InputField__TextBox
    };
};

const TransactionTable__DatePicker__Addon__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const datePickerContext = DatePickerContextHook.useDatePickerContext();

    const inheritedStyle = DatePickerVariant.Default(datePickerContext.props)
        .Addon(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: "100%",
        cursor: "pointer"
    };
};

const TransactionTable__DatePicker__Addon__Icon: IconStyle = function ()
{
    return {
        display: "none"
    };
};

const TransactionTable__DatePicker__Addon: ButtonStyle = function (buttonProps)
{
    const datePickerContext = DatePickerContextHook.useDatePickerContext();

    const inheritedStyle = DatePickerVariant.Default(datePickerContext.props).Addon(buttonProps);

    return {
        ...inheritedStyle,
        Root: TransactionTable__DatePicker__Addon__Root,
        Icon: TransactionTable__DatePicker__Addon__Icon
    };
};

const TransactionTable__DatePicker__Caret: ViewStyle = function ()
{
    return {
        display: "none"
    };
};

const TransactionTable__DatePicker__Calendar__Root: ViewStyle = function (viewProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const datePickerContext = DatePickerContextHook.useDatePickerContext();

    const inheritedStyle = DatePickerVariant.Default(datePickerContext.props)
        .Calendar(calendarContext.props, calendarContext.state)
        .Root(viewProps);

    return {
        ...inheritedStyle,
        marginTop: 0,
        borderTopWidth: 2,
        borderTopStyle: "solid",
        borderTopColor: Color.Primary
    };
};

const TransactionTable__DatePicker__Calendar: CalendarStyle = function (calendarProps, calendarState)
{
    const datePickerContext = DatePickerContextHook.useDatePickerContext();

    const inheritedStyle = DatePickerVariant.Default(datePickerContext.props).Calendar(calendarProps, calendarState);

    return {
        ...inheritedStyle,
        Root: TransactionTable__DatePicker__Calendar__Root
    };
};

const TransactionTable__DatePicker: DatePickerStyle = function (datePickerProps)
{
    return {
        ...DatePickerVariant.Default(datePickerProps),
        Root: TransactionTable__DatePicker__Root,
        InputField: TransactionTable__DatePicker__InputField,
        Addon: TransactionTable__DatePicker__Addon,
        Caret: TransactionTable__DatePicker__Caret,
        Calendar: TransactionTable__DatePicker__Calendar
    };
};

const TransactionTable__TransactionDetails: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-start",
        minWidth: 300,
        maxWidth: undefined,
        height: "auto",
        marginTop: 12,
        ...Environment.useResponsiveStyle("Large", {
            maxWidth: "50%",
            height: 562
        })
    };
};

const TransactionTable__ControlPanel: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        width: "100%",
        height: 58,
        justifyContent: "space-around",
        backgroundColor: Color.Background
    };
};

const TransactionTable__ControlButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flexDirection: "column",
        minWidth: 70,
        height: "100%",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 5,
        paddingBottom: 4,
        borderWidth: 0,
        backgroundColor: Color.Transparent
    };
};

const TransactionTable__ControlButton__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const transactionTableContext = TransactionTableContextHook.useTransactionTableContext();
    const controlButtonTypeContext = TransactionTableContextHook.useControlButtonTypeContext();

    const isActionOrModeButton = controlButtonTypeContext === "action" || controlButtonTypeContext === "mode";
    const isDeleteMode = transactionTableContext.props.mode === TransactionRecord.Mode.Delete;
    const isDraftOrEditMode = transactionTableContext.props.mode === TransactionRecord.Mode.Draft ||
                              transactionTableContext.props.mode === TransactionRecord.Mode.Edit;

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        flexGrow: 1,
        fontSize: 28,
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : isActionOrModeButton && isDraftOrEditMode
                    ? Color.Primary
                    : isActionOrModeButton && isDeleteMode
                        ? Color.Tomato
                        : Color.Neutral
    };
};

const TransactionTable__ControlButton__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const transactionTableContext = TransactionTableContextHook.useTransactionTableContext();
    const controlButtonTypeContext = TransactionTableContextHook.useControlButtonTypeContext();

    const isActionOrModeButton = controlButtonTypeContext === "action" || controlButtonTypeContext === "mode";
    const isDeleteMode = transactionTableContext.props.mode === TransactionRecord.Mode.Delete;
    const isDraftOrEditMode = transactionTableContext.props.mode === TransactionRecord.Mode.Draft ||
                              transactionTableContext.props.mode === TransactionRecord.Mode.Edit;

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(labelProps);

    return {
        ...inheritedStyle,
        lineHeight: 15,
        marginTop: 3,
        paddingVertical: 0,
        paddingHorizontal: 0,
        fontSize: 12,
        fontWeight: "bold",
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : isActionOrModeButton && isDraftOrEditMode
                    ? Color.Primary
                    : isActionOrModeButton && isDeleteMode
                        ? Color.Tomato
                        : Color.Neutral
    };
};

const TransactionTable__ControlButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: TransactionTable__ControlButton__Root,
        Icon: TransactionTable__ControlButton__Icon,
        Label: TransactionTable__ControlButton__Label
    };
};

const TransactionTable__TransactionContainer: ScrollViewStyle = function (scrollViewProps)
{
    return {
        ...ScrollViewVariant.Default(scrollViewProps),
        width: "100%",
        paddingTop: 2
    };
};

const TransactionTable__TransactionRecord__Root: PressableStyle = function (pressableProps, pressableState)
{
    const transactionTableContext = TransactionTableContextHook.useTransactionTableContext();
    const transactionRecordContext = TransactionRecord.ContextHook.useTransactionRecordContext();

    const hasSelectedTransaction = transactionTableContext.props.mode !== TransactionRecord.Mode.ReadOnly;
    const isSelectedTransactionRecord = transactionRecordContext.props.id === transactionTableContext.props.selectedTransaction?.id;

    return {
        ...PressableVariant.Default(pressableProps, pressableState),
        flexDirection: "row",
        justifyContent: "flex-start",
        height: 66,
        paddingTop: 8,
        paddingBottom: 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Neutral,
        marginTop: -2,
        cursor: hasSelectedTransaction ? "default" : "pointer",
        ...((!hasSelectedTransaction && pressableState.hovered) || isSelectedTransactionRecord) && {
            zIndex: Style.Layer.Higher,
            borderColor: Color.Primary,
            backgroundColor: Color.Primary__a10,
            ...transactionTableContext.props.mode === TransactionRecord.Mode.Delete && {
                borderColor: Color.Negative,
                backgroundColor: Color.Negative__a10
            }
        }
    };
};

const TransactionTable__TransactionRecord__Icon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        width: 30,
        height: 30,
        fontSize: 28,
        color: Color.Neutral
    };
};

const TransactionTable__TransactionRecord__NameAndLabelContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: 0,
        height: "100%",
        paddingLeft: 5
    };
};

const TransactionTable__TransactionRecord__NameInputField__Root: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        width: "95%",
        height: 20,
        backgroundColor: Color.Transparent
    };
};

const TransactionTable__TransactionRecord__NameInputField__TextBox: TextInputStyle = function (textInputProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).TextBox(textInputProps);

    return {
        ...inheritedStyle,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 18,
        fontWeight: "bold",
        animations: undefined
    };
};

const TransactionTable__TransactionRecord__NameInputField__Placeholder: LabelStyle = function (labelProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Placeholder(labelProps);

    return {
        ...inheritedStyle,
        display: inputFieldContext.props.value ? "none" : "flex",
        height: "100%",
        paddingLeft: 0,
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        animations: undefined
    };
};

const TransactionTable__TransactionRecord__NameInputField: InputFieldStyle = function (inputFieldProps)
{
    return {
        ...InputFieldVariant.Default(inputFieldProps),
        Root: TransactionTable__TransactionRecord__NameInputField__Root,
        TextBox: TransactionTable__TransactionRecord__NameInputField__TextBox,
        Placeholder: TransactionTable__TransactionRecord__NameInputField__Placeholder
    };
};

const TransactionTable__TransactionRecord__NameLabel: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        alignItems: "flex-start",
        width: "95%",
        lineHeight: 20,
        fontSize: 18,
        fontWeight: "bold",
        color: Color.Neutral
    };
};

const TransactionTable__TransactionRecord__AmountInputField__Root: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();
    const numericInputFieldContext = NumericInputFieldContextHook.useNumericInputFieldContext();
    const transactionRecordContext = TransactionRecord.ContextHook.useTransactionRecordContext();

    const isIncome = Object.values(transactionRecordContext.props.labels)
        .some(label => label.status === TransactionRecord.TransactionLabelStatus.Selected &&
                       label.type === TransactionRecord.TransactionLabelType.Income);

    const inheritedStyle = NumericInputFieldVariant.Default(numericInputFieldContext.props, numericInputFieldContext.state)
        (inputFieldContext.props)
        .Root(viewProps);

    return {
        ...inheritedStyle,
        width: 115,
        height: 38,
        backgroundColor: isIncome ? Color.Positive : Color.Neutral
    };
};

const TransactionTable__TransactionRecord__AmountInputField__TextBox: TextInputStyle = function (textInputProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();
    const numericInputFieldContext = NumericInputFieldContextHook.useNumericInputFieldContext();

    const inheritedStyle = NumericInputFieldVariant.Default(numericInputFieldContext.props, numericInputFieldContext.state)
        (inputFieldContext.props)
        .TextBox(textInputProps);

    return {
        ...inheritedStyle,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        color: Color.Background
    };
};

const TransactionTable__TransactionRecord__AmountInputField: NumericInputFieldStyle = function (numericInputFieldProps,
    numericInputFieldState)
{
    return inputFieldProps => ({
        ...NumericInputFieldVariant.Default(numericInputFieldProps, numericInputFieldState)(inputFieldProps),
        Root: TransactionTable__TransactionRecord__AmountInputField__Root,
        TextBox: TransactionTable__TransactionRecord__AmountInputField__TextBox
    });
};

const TransactionTable__TransactionRecord__AmountLabel: LabelStyle = function (labelProps)
{
    const transactionRecordContext = TransactionRecord.ContextHook.useTransactionRecordContext();

    const isIncome = Object.values(transactionRecordContext.props.labels)
        .some(label => label.status === TransactionRecord.TransactionLabelStatus.Selected &&
                       label.type === TransactionRecord.TransactionLabelType.Income);

    return {
        ...LabelVariant.Default(labelProps),
        width: 115,
        height: 38,
        marginLeft: "auto",
        fontSize: 17,
        fontWeight: "bold",
        color: Color.Background,
        backgroundColor: isIncome ? Color.Positive : Color.Neutral
    };
};

const TransactionTable__TransactionRecord__LabelSelector__Root: ViewStyle = function (viewProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        width: "95%",
        height: 18,
        minHeight: undefined,
        marginHorizontal: 1,
        overflow: "hidden",
        cursor: "default"
    };
};

const TransactionTable__TransactionRecord__LabelSelector__SelectedItemContainer: PressableStyle = function ()
{
    return {
        display: "none"
    };
};

const TransactionTable__TransactionRecord__LabelSelector__Caret: ViewStyle = function ()
{
    return {
        display: "none"
    };
};

const TransactionTable__TransactionRecord__LabelSelector__Menu: ScrollViewStyle = function (scrollViewProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).Menu(scrollViewProps);

    return {
        ...inheritedStyle,
        flexDirection: "row",
        top: 0,
        height: "100%",
        paddingVertical: 0,
        marginVertical: 0,
        backgroundColor: Color.Transparent
    };
};

const TransactionTable__TransactionRecord__LabelSelector__MenuItem__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const menuItemContext = DropdownMenuContextHook.useMenuItemContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props)
        .MenuItem(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        display: menuItemContext.status === MenuItemStatus.Disabled ? "none" : "flex",
        flex: 1,
        width: "auto",
        height: "100%",
        minWidth: "auto",
        paddingVertical: 0,
        paddingHorizontal: 8,
        marginBottom: 0,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: Color.Neutral,
        backgroundColor: menuItemContext.status === MenuItemStatus.Selected || pressableState.pressed
            ? Color.Neutral
            : pressableState.hovered
                ? Color.Neutral__a10
                : Color.Transparent
    };
};

const TransactionTable__TransactionRecord__LabelSelector__MenuItem__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props)
        .MenuItem(buttonContext.props)
        .Label(labelProps);

    return {
        ...inheritedStyle,
        paddingRight: 0,
        fontSize: 12
    };
};

const TransactionTable__TransactionRecord__LabelSelector__MenuItem__Icon: IconStyle = function ()
{
    return {
        display: "none"
    };
};

const TransactionTable__TransactionRecord__LabelSelector__MenuItem: ButtonStyle = function (buttonProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).MenuItem(buttonProps);

    return {
        ...inheritedStyle,
        Root: TransactionTable__TransactionRecord__LabelSelector__MenuItem__Root,
        Label: TransactionTable__TransactionRecord__LabelSelector__MenuItem__Label,
        Icon: TransactionTable__TransactionRecord__LabelSelector__MenuItem__Icon
    };
};

const TransactionTable__TransactionRecord__LabelSelector__Divider: ViewStyle = function ()
{
    return {
        display: "none"
    };
};

const TransactionTable__TransactionRecord__LabelSelector: DropdownMenuStyle = function (dropdownMenuProps)
{
    return {
        ...DropdownMenuVariant.Default(dropdownMenuProps),
        Root: TransactionTable__TransactionRecord__LabelSelector__Root,
        SelectedItemContainer: TransactionTable__TransactionRecord__LabelSelector__SelectedItemContainer,
        Caret: TransactionTable__TransactionRecord__LabelSelector__Caret,
        Menu: TransactionTable__TransactionRecord__LabelSelector__Menu,
        MenuItem: TransactionTable__TransactionRecord__LabelSelector__MenuItem,
        Divider: TransactionTable__TransactionRecord__LabelSelector__Divider
    };
};

const TransactionTable__TransactionRecord__LabelContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "95%",
        height: 18,
        paddingLeft: 1,
        backgroundColor: Color.Transparent,
        overflow: "hidden"
    };
};

const TransactionTable__TransactionRecord__Label: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        height: "100%",
        paddingHorizontal: 8,
        marginRight: 5,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: Color.Neutral,
        fontSize: 12,
        color: Color.Background,
        backgroundColor: Color.Neutral
    };
};

const TransactionTable__TransactionRecord: TransactionRecord.Style = function ()
{
    return {
        Root: TransactionTable__TransactionRecord__Root,
        Icon: TransactionTable__TransactionRecord__Icon,
        NameAndLabelContainer: TransactionTable__TransactionRecord__NameAndLabelContainer,
        NameInputField: TransactionTable__TransactionRecord__NameInputField,
        NameLabel: TransactionTable__TransactionRecord__NameLabel,
        AmountInputField: TransactionTable__TransactionRecord__AmountInputField,
        AmountLabel: TransactionTable__TransactionRecord__AmountLabel,
        LabelSelector: TransactionTable__TransactionRecord__LabelSelector,
        LabelContainer: TransactionTable__TransactionRecord__LabelContainer,
        Label: TransactionTable__TransactionRecord__Label
    };
};

const TransactionTable__Hr: ViewStyle = function (viewProps)
{
    const hrPosition = TransactionTableContextHook.useHrPositionContext();

    const runningOnMobileApp = Environment.use("MobileApp");

    return {
        ...ViewVariant.Default(viewProps),
        position: "absolute",
        width: "100%",
        height: 2,
        zIndex: Style.Layer.Lower,
        backgroundColor: Color.Neutral,
        ...hrPosition === "top" && {top: 58},
        ...hrPosition === "bottom" && {bottom: runningOnMobileApp ? 53 : 54}
    };
};

const TransactionTable__AddNewButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: "100%",
        height: 66,
        borderWidth: 2,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: Color.Neutral,
        marginTop: -2,
        ...pressableState.hovered && {
            zIndex: Style.Layer.Higher,
            borderColor: Color.Primary,
            backgroundColor: Color.Primary__a10
        },
        ...pressableState.pressed && {
            zIndex: Style.Layer.Higher,
            borderColor: Color.Primary,
            backgroundColor: Color.Primary
        }
    };
};

const TransactionTable__AddNewButton__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        height: "100%",
        fontSize: 35,
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral
    };
};

const TransactionTable__AddNewButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: TransactionTable__AddNewButton__Root,
        Icon: TransactionTable__AddNewButton__Icon
    };
};

const TransactionTable__Summary__Root: ViewStyle = function (viewProps)
{
    const runningOnMobileApp = Environment.use("MobileApp");

    return {
        ...ViewVariant.Default(viewProps),
        width: "100%",
        height: runningOnMobileApp ? 53 : 54,
        paddingTop: 5
    };
};

const TransactionTable__Summary__Row: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        width: "100%",
        height: "50%"
    };
};

const TransactionTable__Summary__Label: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        flexGrow: 1,
        alignItems: "flex-end",
        lineHeight: 25,
        fontSize: 16,
        fontWeight: "bold",
        color: Color.Neutral
    };
};

const TransactionTable__Summary__Amount: LabelStyle = function (labelProps)
{
    const rowContext = Summary.ContextHook.useRowContext();

    return {
        ...LabelVariant.Default(labelProps),
        alignItems: "flex-end",
        width: 128,
        lineHeight: 25,
        paddingRight: 1,
        fontSize: 16,
        fontWeight: "bold",
        color: rowContext === "expense"
            ? Color.Warning
            : Color.Positive
    };
};

const TransactionTable__Summary: Summary.Style = function ()
{
    return {
        Root: TransactionTable__Summary__Root,
        Row: TransactionTable__Summary__Row,
        Label: TransactionTable__Summary__Label,
        Amount: TransactionTable__Summary__Amount
    };
};

export const Default: TransactionTableStyle = function ()
{
    return {
        Root: TransactionTable__Root,
        TransactionDetails: TransactionTable__TransactionDetails,
        TransactionContainer: TransactionTable__TransactionContainer,
        Hr: TransactionTable__Hr,
        Calendar: TransactionTable__Calendar,
        DatePicker: TransactionTable__DatePicker,
        ControlPanel: TransactionTable__ControlPanel,
        ControlButton: TransactionTable__ControlButton,
        TransactionRecord: TransactionTable__TransactionRecord,
        AddNewButton: TransactionTable__AddNewButton,
        Summary: TransactionTable__Summary
    };
};

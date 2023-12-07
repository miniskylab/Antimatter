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
import {Pips, RangeSliderContextHook, RangeSliderStyle, RangeSliderVariant} from "@miniskylab/antimatter-range-slider";
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
        flex: 1,
        flexDirection: "column",
        minWidth: 300,
        maxWidth: 1000,
        minHeight: 500,
        ...Environment.useResponsiveStyle("Large", {
            flexDirection: "row",
            flexWrap: "wrap"
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

const TransactionTable__Summary__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        flexWrap: "wrap",
        alignSelf: "stretch",
        marginTop: 5,
        ...Environment.useResponsiveStyle("Large", {
            flexBasis: "100%",
            marginTop: 0
        })
    };
};

const TransactionTable__Summary__Section: ViewStyle = function (viewProps)
{
    const sectionContext = Summary.ContextHook.useSectionContext();

    return {
        ...ViewVariant.Default(viewProps),
        flexBasis: "50%",
        marginBottom: -5,
        alignItems: sectionContext === "section-1" ? "flex-start" : "flex-end"
    };
};

const TransactionTable__Summary__Label: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        lineHeight: 20,
        fontSize: 15,
        fontWeight: "bold",
        color: Color.Neutral
    };
};

const TransactionTable__Summary__Amount: LabelStyle = function (labelProps)
{
    const sectionContext = Summary.ContextHook.useSectionContext();

    return {
        ...LabelVariant.Default(labelProps),
        lineHeight: 25,
        fontSize: 20,
        fontWeight: "bold",
        color: sectionContext === "section-1" ? Color.Positive : Color.Warning,
        ...Environment.useResponsiveStyle("Large", {
            lineHeight: 30
        })
    };
};

const TransactionTable__Summary__RangeSlider__Root: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        flexBasis: "100%"
    };
};

const TransactionTable__Summary__RangeSlider__Track: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).Track(viewProps);

    return {
        ...inheritedStyle,
        marginTop: 8,
        marginBottom: 3,
        ...Environment.useResponsiveStyle("Large", {
            marginBottom: 5
        })
    };
};

const TransactionTable__Summary__RangeSlider__StopperLeft: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).StopperLeft(viewProps);

    return {
        ...inheritedStyle,
        width: 10,
        backgroundColor: Color.Green
    };
};

const TransactionTable__Summary__RangeSlider__StopperRight: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).StopperRight(viewProps);

    return {
        ...inheritedStyle,
        width: 10,
        backgroundColor: Color.Gold
    };
};

const TransactionTable__Summary__RangeSlider__FillLeft: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).FillLeft(viewProps);

    return {
        ...inheritedStyle,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: Color.Green
    };
};

const TransactionTable__Summary__RangeSlider__FillRight: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).FillRight(viewProps);

    return {
        ...inheritedStyle,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: Color.Gold
    };
};

const TransactionTable__Summary__RangeSlider__Knob: ViewStyle = function (viewProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).Knob(viewProps);

    return {
        ...inheritedStyle,
        display: "flex",
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 4,
        transform: [{translateX: -10}]
    };
};

const TransactionTable__Summary__RangeSlider__KnobIcon: IconStyle = function (iconProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).KnobIcon(iconProps);

    return {
        ...inheritedStyle,
        display: "none"
    };
};

const TransactionTable__Summary__RangeSlider__Pips__Pip: ViewStyle = function (viewProps)
{
    const pipsContext = Pips.ContextHook.usePipsContext();
    const isHighlighted = Pips.ContextHook.useHighlightedContext();
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props)
        .Pips(pipsContext.props)
        .Pip(viewProps);

    return {
        ...inheritedStyle,
        backgroundColor: isHighlighted ? Color.Green : Color.Gold
    };
};

const TransactionTable__Summary__RangeSlider__Pips__Label: LabelStyle = function (labelProps)
{
    const pipsContext = Pips.ContextHook.usePipsContext();
    const isHighlighted = Pips.ContextHook.useHighlightedContext();
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props)
        .Pips(pipsContext.props)
        .Label(labelProps);

    return {
        ...inheritedStyle,
        color: isHighlighted ? Color.Green : Color.Gold
    };
};

const TransactionTable__Summary__RangeSlider__Pips: Pips.Style = function (pipProps)
{
    const rangeSliderContext = RangeSliderContextHook.useRangeSliderContext();

    const inheritedStyle = RangeSliderVariant.Default(rangeSliderContext.props).Pips(pipProps);

    return {
        ...inheritedStyle,
        Pip: TransactionTable__Summary__RangeSlider__Pips__Pip,
        Label: TransactionTable__Summary__RangeSlider__Pips__Label
    };
};

const TransactionTable__Summary__RangeSlider: RangeSliderStyle = function (rangeSliderProps)
{
    return {
        ...RangeSliderVariant.Default(rangeSliderProps),
        Root: TransactionTable__Summary__RangeSlider__Root,
        Track: TransactionTable__Summary__RangeSlider__Track,
        StopperLeft: TransactionTable__Summary__RangeSlider__StopperLeft,
        StopperRight: TransactionTable__Summary__RangeSlider__StopperRight,
        FillLeft: TransactionTable__Summary__RangeSlider__FillLeft,
        FillRight: TransactionTable__Summary__RangeSlider__FillRight,
        Knob: TransactionTable__Summary__RangeSlider__Knob,
        KnobIcon: TransactionTable__Summary__RangeSlider__KnobIcon,
        Pips: TransactionTable__Summary__RangeSlider__Pips
    };
};

const TransactionTable__Summary: Summary.Style = function ()
{
    return {
        Root: TransactionTable__Summary__Root,
        Section: TransactionTable__Summary__Section,
        Label: TransactionTable__Summary__Label,
        Amount: TransactionTable__Summary__Amount,
        RangeSlider: TransactionTable__Summary__RangeSlider
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
        marginTop: 5,
        ...Environment.useResponsiveStyle("Large", {
            maxWidth: "50%",
            height: 508,
            marginTop: 12
        })
    };
};

const TransactionTable__ControlPanel: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        alignSelf: "stretch",
        height: 58,
        justifyContent: "space-around",
        backgroundColor: Color.Background
    };
};

const TransactionTable__ControlButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const transactionTableContext = TransactionTableContextHook.useTransactionTableContext();
    const controlButtonTypeContext = TransactionTableContextHook.useControlButtonTypeContext();

    const isModeButton = controlButtonTypeContext === "mode";
    const isDraftMode = transactionTableContext.props.mode === TransactionRecord.Mode.Draft;
    const isReadOnlyMode = transactionTableContext.props.mode === TransactionRecord.Mode.ReadOnly;

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flexDirection: "column",
        minWidth: 100,
        height: "100%",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 5,
        paddingBottom: 4,
        borderWidth: 0,
        backgroundColor: Color.Transparent,
        ...isModeButton && {
            opacity: 1,
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: isDraftMode
                ? Color.Primary
                : isReadOnlyMode
                    ? Color.Neutral
                    : Color.Transparent
        }
    };
};

const TransactionTable__ControlButton__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const transactionTableContext = TransactionTableContextHook.useTransactionTableContext();
    const controlButtonTypeContext = TransactionTableContextHook.useControlButtonTypeContext();

    const isModeButton = controlButtonTypeContext === "mode";
    const isActionButton = controlButtonTypeContext === "action";
    const isCancelButton = controlButtonTypeContext === "cancel";
    const isDraftMode = transactionTableContext.props.mode === TransactionRecord.Mode.Draft;
    const isEditMode = transactionTableContext.props.mode === TransactionRecord.Mode.Edit;
    const isDeleteMode = transactionTableContext.props.mode === TransactionRecord.Mode.Delete;
    const isReadOnlyMode = transactionTableContext.props.mode === TransactionRecord.Mode.ReadOnly;

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        flexGrow: 1,
        fontSize: 28,
        ...isActionButton && {
            color: isDraftMode || isEditMode
                ? Color.Primary
                : isDeleteMode
                    ? Color.Tomato
                    : Color.Neutral
        },
        ...isModeButton && {
            color: isDraftMode || isReadOnlyMode
                ? Color.Background
                : isEditMode
                    ? Color.Primary
                    : isDeleteMode
                        ? Color.Tomato
                        : Color.Neutral
        },
        ...isCancelButton && {color: Color.Neutral},
        ...pressableContext.state.hovered && {color: Color.White},
        ...pressableContext.state.pressed && {color: Color.Gray}
    };
};

const TransactionTable__ControlButton__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const transactionTableContext = TransactionTableContextHook.useTransactionTableContext();
    const controlButtonTypeContext = TransactionTableContextHook.useControlButtonTypeContext();

    const isModeButton = controlButtonTypeContext === "mode";
    const isActionButton = controlButtonTypeContext === "action";
    const isCancelButton = controlButtonTypeContext === "cancel";
    const isDraftMode = transactionTableContext.props.mode === TransactionRecord.Mode.Draft;
    const isEditMode = transactionTableContext.props.mode === TransactionRecord.Mode.Edit;
    const isDeleteMode = transactionTableContext.props.mode === TransactionRecord.Mode.Delete;
    const isReadOnlyMode = transactionTableContext.props.mode === TransactionRecord.Mode.ReadOnly;

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(labelProps);

    return {
        ...inheritedStyle,
        lineHeight: 15,
        marginTop: 3,
        paddingVertical: 0,
        paddingHorizontal: 0,
        fontSize: 12,
        fontWeight: "bold",
        ...isActionButton && {
            color: isDraftMode || isEditMode
                ? Color.Primary
                : isDeleteMode
                    ? Color.Tomato
                    : Color.Neutral
        },
        ...isModeButton && {
            color: isDraftMode || isReadOnlyMode
                ? Color.Background
                : isEditMode
                    ? Color.Primary
                    : isDeleteMode
                        ? Color.Tomato
                        : Color.Neutral
        },
        ...isCancelButton && {color: Color.Neutral},
        ...pressableContext.state.hovered && {color: Color.White},
        ...pressableContext.state.pressed && {color: Color.Gray}
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
        alignSelf: "stretch",
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

const TransactionTable__TransactionRecord__NameAndTagContainer: ViewStyle = function (viewProps)
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

    const isHighlighted = Object.values(transactionRecordContext.props.tags)
        .some(
            tag => tag.status === TransactionRecord.TagStatus.Selected &&
                   tag.metadata?.has(TransactionRecord.TagMetadata.HighlightTarget)
        );

    const inheritedStyle = NumericInputFieldVariant.Default(numericInputFieldContext.props, numericInputFieldContext.state)
        (inputFieldContext.props)
        .Root(viewProps);

    return {
        ...inheritedStyle,
        width: 115,
        height: 38,
        backgroundColor: isHighlighted ? Color.Positive : Color.Neutral
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

    const isHighlighted = Object.values(transactionRecordContext.props.tags)
        .some(
            tag => tag.status === TransactionRecord.TagStatus.Selected &&
                   tag.metadata?.has(TransactionRecord.TagMetadata.HighlightTarget)
        );

    return {
        ...LabelVariant.Default(labelProps),
        width: 115,
        height: 38,
        marginLeft: "auto",
        fontSize: 17,
        fontWeight: "bold",
        color: Color.Background,
        backgroundColor: isHighlighted ? Color.Positive : Color.Neutral
    };
};

const TransactionTable__TransactionRecord__TagSelector__Root: ViewStyle = function (viewProps)
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

const TransactionTable__TransactionRecord__TagSelector__SelectedItemContainer: PressableStyle = function ()
{
    return {
        display: "none"
    };
};

const TransactionTable__TransactionRecord__TagSelector__Caret: ViewStyle = function ()
{
    return {
        display: "none"
    };
};

const TransactionTable__TransactionRecord__TagSelector__Menu: ScrollViewStyle = function (scrollViewProps)
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

const TransactionTable__TransactionRecord__TagSelector__MenuItem__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const menuItemContext = DropdownMenuContextHook.useMenuItemContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const isHighlighted = menuItemContext.context.includes(TransactionRecord.TagMetadata.HighlightTarget);

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props)
        .MenuItem(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flex: 1,
        width: "auto",
        height: "100%",
        minWidth: "auto",
        paddingVertical: 0,
        paddingHorizontal: 8,
        marginBottom: 0,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: isHighlighted ? Color.Positive : Color.Neutral,
        backgroundColor: menuItemContext.status === MenuItemStatus.Selected || pressableState.pressed
            ? isHighlighted ? Color.Positive : Color.Neutral
            : pressableState.hovered
                ? isHighlighted ? Color.Positive__a10 : Color.Neutral__a10
                : Color.Transparent
    };
};

const TransactionTable__TransactionRecord__TagSelector__MenuItem__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const menuItemContext = DropdownMenuContextHook.useMenuItemContext();
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const isHighlighted = menuItemContext.context.includes(TransactionRecord.TagMetadata.HighlightTarget);

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props)
        .MenuItem(buttonContext.props)
        .Label(labelProps);

    return {
        ...inheritedStyle,
        paddingRight: 0,
        fontSize: 12,
        color: menuItemContext.status === MenuItemStatus.Selected || pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : isHighlighted
                    ? Color.Positive
                    : Color.Neutral
    };
};

const TransactionTable__TransactionRecord__TagSelector__MenuItem__Icon: IconStyle = function ()
{
    return {
        display: "none"
    };
};

const TransactionTable__TransactionRecord__TagSelector__MenuItem: ButtonStyle = function (buttonProps)
{
    const dropdownMenuContext = DropdownMenuContextHook.useDropdownMenuContext();

    const inheritedStyle = DropdownMenuVariant.Default(dropdownMenuContext.props).MenuItem(buttonProps);

    return {
        ...inheritedStyle,
        Root: TransactionTable__TransactionRecord__TagSelector__MenuItem__Root,
        Label: TransactionTable__TransactionRecord__TagSelector__MenuItem__Label,
        Icon: TransactionTable__TransactionRecord__TagSelector__MenuItem__Icon
    };
};

const TransactionTable__TransactionRecord__TagSelector__Divider: ViewStyle = function ()
{
    return {
        display: "none"
    };
};

const TransactionTable__TransactionRecord__TagSelector: DropdownMenuStyle = function (dropdownMenuProps)
{
    return {
        ...DropdownMenuVariant.Default(dropdownMenuProps),
        Root: TransactionTable__TransactionRecord__TagSelector__Root,
        SelectedItemContainer: TransactionTable__TransactionRecord__TagSelector__SelectedItemContainer,
        Caret: TransactionTable__TransactionRecord__TagSelector__Caret,
        Menu: TransactionTable__TransactionRecord__TagSelector__Menu,
        MenuItem: TransactionTable__TransactionRecord__TagSelector__MenuItem,
        Divider: TransactionTable__TransactionRecord__TagSelector__Divider
    };
};

const TransactionTable__TransactionRecord__TagContainer: ViewStyle = function (viewProps)
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

const TransactionTable__TransactionRecord__Tag: LabelStyle = function (labelProps)
{
    const tagMetadataContext = TransactionRecord.ContextHook.useTagMetadataContext();

    const tagMetadata = tagMetadataContext.split(",");
    const isHighlighted = tagMetadata.includes(TransactionRecord.TagMetadata.HighlightTarget);

    return {
        ...LabelVariant.Default(labelProps),
        height: "100%",
        paddingHorizontal: 8,
        marginRight: 5,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: isHighlighted ? Color.Positive : Color.Neutral,
        fontSize: 12,
        color: Color.Background,
        backgroundColor: isHighlighted ? Color.Positive : Color.Neutral
    };
};

const TransactionTable__TransactionRecord: TransactionRecord.Style = function ()
{
    return {
        Root: TransactionTable__TransactionRecord__Root,
        Icon: TransactionTable__TransactionRecord__Icon,
        NameAndTagContainer: TransactionTable__TransactionRecord__NameAndTagContainer,
        NameInputField: TransactionTable__TransactionRecord__NameInputField,
        NameLabel: TransactionTable__TransactionRecord__NameLabel,
        AmountInputField: TransactionTable__TransactionRecord__AmountInputField,
        AmountLabel: TransactionTable__TransactionRecord__AmountLabel,
        TagSelector: TransactionTable__TransactionRecord__TagSelector,
        TagContainer: TransactionTable__TransactionRecord__TagContainer,
        Tag: TransactionTable__TransactionRecord__Tag
    };
};

const TransactionTable__Hr: ViewStyle = function (viewProps)
{
    const hrPosition = TransactionTableContextHook.useHrPositionContext();

    return {
        ...ViewVariant.Default(viewProps),
        position: "absolute",
        width: "100%",
        height: 2,
        zIndex: Style.Layer.Lower,
        backgroundColor: Color.Neutral,
        ...hrPosition === "top" && {top: 58},
        ...hrPosition === "bottom" && {bottom: 0}
    };
};

export const Default: TransactionTableStyle = function ()
{
    return {
        Root: TransactionTable__Root,
        Calendar: TransactionTable__Calendar,
        DatePicker: TransactionTable__DatePicker,
        Summary: TransactionTable__Summary,
        TransactionDetails: TransactionTable__TransactionDetails,
        ControlPanel: TransactionTable__ControlPanel,
        ControlButton: TransactionTable__ControlButton,
        TransactionContainer: TransactionTable__TransactionContainer,
        TransactionRecord: TransactionTable__TransactionRecord,
        Hr: TransactionTable__Hr
    };
};

import {ButtonContextHook, ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {CalendarStyle, CalendarVariant} from "@miniskylab/antimatter-calendar";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {Layer} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {InputFieldContextHook, InputFieldStyle, InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {DatePickerContextHook} from "../hook";
import {DatePickerStyle} from "../model";

const DatePicker__InputField__Placeholder: LabelStyle = function (labelProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedLabelStyle = InputFieldVariant.Default(inputFieldContext.props)
        .Placeholder(labelProps);

    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        fontStyle: "italic"
    };

    return labelStyle;
};

const DatePicker__InputField: InputFieldStyle = function (inputFieldProps)
{
    const defaultInputFieldStyle = InputFieldVariant.Default(inputFieldProps);
    const inputFieldStyle: ReturnType<InputFieldStyle> = {...defaultInputFieldStyle};

    inputFieldStyle.Root = {
        ...defaultInputFieldStyle.Root,
        height: "100%"
    };

    inputFieldStyle.TextBox = {
        ...defaultInputFieldStyle.TextBox,
        paddingRight: 36
    };

    inputFieldStyle.Placeholder = DatePicker__InputField__Placeholder;

    return inputFieldStyle;
};

const DatePicker__Addon__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const datePickerContext = DatePickerContextHook.useDatePickerContext();

    const inheritedIconStyle = ButtonVariant.OutlinedCircular(buttonContext.props, buttonContext.state)
        .Icon(iconProps);

    const iconStyle: ReturnType<IconStyle> = {...inheritedIconStyle};

    iconStyle.Root = {
        ...inheritedIconStyle.Root,
        fontSize: 16,
        color: datePickerContext.props.calendarIsOpen
            ? buttonContext.state.pressed
                ? Color.White
                : Color.Primary
            : buttonContext.state.pressed
                ? Color.Primary
                : buttonContext.state.hovered
                    ? Color.White
                    : Color.Neutral
    };

    return iconStyle;
};

const DatePicker__Addon: ButtonStyle = function (buttonProps, buttonState)
{
    const outlinedCircularButtonStyle = ButtonVariant.OutlinedCircular(buttonProps, buttonState);
    const buttonStyle: ReturnType<ButtonStyle> = {...outlinedCircularButtonStyle};

    buttonStyle.Root = {
        ...outlinedCircularButtonStyle.Root,
        position: "absolute",
        top: 0,
        right: 0,
        width: 36,
        height: "100%",
        borderWidth: 0,
        backgroundColor: Color.Transparent
    };

    buttonStyle.Icon = DatePicker__Addon__Icon;

    return buttonStyle;
};

const DatePicker__Calendar: CalendarStyle = function (calendarProps, calendarState)
{
    const defaultCalendarStyle = CalendarVariant.Mini(calendarProps, calendarState);
    const calendarStyle: ReturnType<CalendarStyle> = {...defaultCalendarStyle};

    calendarStyle.Root = {
        ...defaultCalendarStyle.Root,
        position: "absolute",
        top: "100%",
        width: "100%",
        padding: 12,
        paddingTop: 10,
        marginTop: 6,
        backgroundColor: Color.Background,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 20,
        shadowColor: Color.Black
    };

    return calendarStyle;
};

export const Default: DatePickerStyle = function ()
{
    const datePickerStyle: ReturnType<DatePickerStyle> = {};

    datePickerStyle.Root = {
        width: 276,
        height: 34
    };

    datePickerStyle.Caret = {
        position: "absolute",
        top: 16,
        right: 6,
        width: 0,
        height: 0,
        borderWidth: 12,
        borderStyle: "solid",
        borderColor: Color.Transparent,
        borderBottomColor: Color.Background,
        zIndex: Layer.AlwaysOnTop
    };

    datePickerStyle.InputField = DatePicker__InputField;
    datePickerStyle.Addon = DatePicker__Addon;
    datePickerStyle.Calendar = DatePicker__Calendar;

    return datePickerStyle;
};

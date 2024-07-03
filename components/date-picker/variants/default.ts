import {ButtonContextHook, type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {CalendarContextHook, type CalendarStyle, CalendarVariant} from "@miniskylab/antimatter-calendar";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {Layer} from "@miniskylab/antimatter-framework";
import {type IconStyle} from "@miniskylab/antimatter-icon";
import {InputFieldContextHook, type InputFieldStyle, InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {PressableContextHook, type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type TextStyle} from "@miniskylab/antimatter-text";
import {type TextInputStyle} from "@miniskylab/antimatter-text-input";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {DatePickerContextHook} from "../hooks";
import {type DatePickerStyle} from "../models";

const DatePicker__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        width: 276,
        height: 34
    };
};

const DatePicker__Caret: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
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
};

const DatePicker__InputField__Root: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props)
        .Root(viewProps);

    return {
        ...inheritedStyle,
        height: "100%"
    };
};

const DatePicker__InputField__TextBox: TextInputStyle = function (textInputProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props)
        .TextBox(textInputProps);

    return {
        ...inheritedStyle,
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 36
    };
};

const DatePicker__InputField__Placeholder: TextStyle = function (textProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props)
        .Placeholder(textProps);

    return {
        ...inheritedStyle,
        fontStyle: "italic"
    };
};

const DatePicker__InputField: InputFieldStyle = function (inputFieldProps)
{
    return {
        ...InputFieldVariant.Default(inputFieldProps),
        Root: DatePicker__InputField__Root,
        TextBox: DatePicker__InputField__TextBox,
        Placeholder: DatePicker__InputField__Placeholder
    };
};

const DatePicker__Addon__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        position: "absolute",
        top: 0,
        right: 0,
        width: 36,
        height: "100%",
        borderWidth: 0,
        backgroundColor: Color.Transparent
    };
};

const DatePicker__Addon__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const datePickerContext = DatePickerContextHook.useDatePickerContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        fontSize: 16,
        color: datePickerContext.props.calendarIsOpen
            ? pressableContext.state.pressed
                ? Color.White
                : Color.Primary
            : pressableContext.state.pressed
                ? Color.Primary
                : pressableContext.state.hovered
                    ? Color.White
                    : Color.Neutral
    };
};

const DatePicker__Addon: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedCircular(buttonProps),
        Root: DatePicker__Addon__Root,
        Icon: DatePicker__Addon__Icon
    };
};

const DatePicker__Calendar__Root: ViewStyle = function (viewProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = CalendarVariant.Mini(calendarContext.props, calendarContext.state).Root(viewProps);

    return {
        ...inheritedStyle,
        position: "absolute",
        top: "100%",
        width: "100%",
        padding: 12,
        paddingTop: 10,
        marginTop: 6,
        backgroundColor: Color.Background,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 20,
        shadowColor: Color.Black,
        shadowOpacity: 1
    };
};

const DatePicker__Calendar: CalendarStyle = function (calendarProps, calendarState)
{
    return {
        ...CalendarVariant.Mini(calendarProps, calendarState),
        Root: DatePicker__Calendar__Root
    };
};

export const Default: DatePickerStyle = function ()
{
    return {
        Root: DatePicker__Root,
        Caret: DatePicker__Caret,
        InputField: DatePicker__InputField,
        Addon: DatePicker__Addon,
        Calendar: DatePicker__Calendar
    };
};

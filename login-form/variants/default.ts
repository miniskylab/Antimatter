import {ButtonContextHook, type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {InputFieldContextHook, type InputFieldStyle, InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {type LoginFormStyle} from "../models";

const LoginForm__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexShrink: 1,
        flexDirection: "column",
        width: 450,
        minWidth: 300,
        maxWidth: 450,
        padding: 30,
        borderRadius: 10,
        backgroundColor: Color.Background,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 20,
        shadowColor: Color.Black,
        shadowOpacity: 1
    };
};

const LoginForm__Logo: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        width: 80,
        height: 80,
        fontSize: 80,
        color: Color.Neutral
    };
};

const LoginForm__Title: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        height: 30,
        marginTop: 25,
        fontSize: 25,
        fontWeight: "bold",
        color: Color.White
    };
};

const LoginForm__Subtitle: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        height: 20,
        marginVertical: 5,
        fontSize: 16,
        color: Color.Gray
    };
};

const LoginForm__InputField__Root: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        marginTop: 15
    };
};

const LoginForm__InputField: InputFieldStyle = function (inputFieldProps)
{
    return {
        ...InputFieldVariant.Default(inputFieldProps),
        Root: LoginForm__InputField__Root
    };
};

const LoginForm__LoginButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: "100%",
        height: 40,
        marginTop: 30
    };
};

const LoginForm__LoginButton__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Label(textProps);

    return {
        ...inheritedStyle,
        fontSize: 16,
        fontWeight: "bold"
    };
};

const LoginForm__LoginButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.SolidRectangular(buttonProps),
        Root: LoginForm__LoginButton__Root,
        Label: LoginForm__LoginButton__Label
    };
};

export const Default: LoginFormStyle = function ()
{
    return {
        Root: LoginForm__Root,
        Logo: LoginForm__Logo,
        Title: LoginForm__Title,
        Subtitle: LoginForm__Subtitle,
        InputField: LoginForm__InputField,
        LoginButton: LoginForm__LoginButton
    };
};

import {ButtonContextHook, type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {PressableContextHook, type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {LocalAuthenticationStatus} from "../enums";
import {LocalAuthenticationFormContextHook} from "../hooks";
import {type LocalAuthenticationFormStyle} from "../models";

const LocalAuthenticationForm__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        justifyContent: "flex-start",
        minHeight: 500,
        paddingHorizontal: 20
    };
};

const LocalAuthenticationForm__Title: TextStyle = function (textProps)
{
    const localAuthenticationFormContext = LocalAuthenticationFormContextHook.useLocalAuthenticationFormContext();

    return {
        ...TextVariant.Default(textProps),
        marginTop: 65,
        fontSize: 24,
        fontWeight: "bold",
        color: localAuthenticationFormContext.props.localAuthenticationStatus === LocalAuthenticationStatus.BiometricHardwareAccessDenied
            ? Color.Tomato
            : Color.White
    };
};

const LocalAuthenticationForm__Subtitle: TextStyle = function (textProps)
{
    const localAuthenticationFormContext = LocalAuthenticationFormContextHook.useLocalAuthenticationFormContext();

    return {
        ...TextVariant.Default(textProps),
        lineHeight: 28,
        marginTop: 55,
        fontSize: 16,
        textAlign: "center",
        color: Color.Neutral,
        ...localAuthenticationFormContext.props.localAuthenticationStatus === LocalAuthenticationStatus.WaitingForForeground && {
            color: Color.Green,
            fontWeight: "bold"
        }
    };
};

const LocalAuthenticationForm__PromptButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        marginTop: 80,
        width: 100,
        height: 100,
        minWidth: undefined,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 0,
        backgroundColor: Color.Transparent
    };
};

const LocalAuthenticationForm__PromptButton__Icon: IconStyle = function (iconProps)
{
    const pressableContext = PressableContextHook.usePressableContext();

    return {
        ...IconVariant.Default(iconProps),
        fontSize: 95,
        color: Color.White,
        opacity: pressableContext.state.pressed ? .2 : 1
    };
};

const LocalAuthenticationForm__PromptButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: LocalAuthenticationForm__PromptButton__Root,
        Icon: LocalAuthenticationForm__PromptButton__Icon
    };
};

export const Default: LocalAuthenticationFormStyle = function ()
{
    return {
        Root: LocalAuthenticationForm__Root,
        Title: LocalAuthenticationForm__Title,
        Subtitle: LocalAuthenticationForm__Subtitle,
        PromptButton: LocalAuthenticationForm__PromptButton
    };
};

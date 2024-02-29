import {ButtonContextHook, ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {PressableContextHook, PressableStyle} from "@miniskylab/antimatter-pressable";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {LocalAuthenticationStatus} from "../enums";
import {LocalAuthenticationPromptContextHook} from "../hooks";
import {LocalAuthenticationPromptStyle} from "../models";

const LocalAuthenticationPrompt__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        justifyContent: "flex-start",
        minHeight: 500,
        paddingHorizontal: 20
    };
};

const LocalAuthenticationPrompt__Title: LabelStyle = function (labelProps)
{
    const localAuthenticationPromptContext = LocalAuthenticationPromptContextHook.useLocalAuthenticationPromptContext();

    return {
        ...LabelVariant.Default(labelProps),
        marginTop: 65,
        fontSize: 24,
        fontWeight: "bold",
        color: localAuthenticationPromptContext.props.localAuthenticationStatus === LocalAuthenticationStatus.BiometricHardwareAccessDenied
            ? Color.Tomato
            : Color.White
    };
};

const LocalAuthenticationPrompt__Subtitle: LabelStyle = function (labelProps)
{
    const localAuthenticationPromptContext = LocalAuthenticationPromptContextHook.useLocalAuthenticationPromptContext();

    return {
        ...LabelVariant.Default(labelProps),
        lineHeight: 28,
        marginTop: 55,
        fontSize: 16,
        textAlign: "center",
        color: Color.Neutral,
        ...localAuthenticationPromptContext.props.localAuthenticationStatus === LocalAuthenticationStatus.WaitingForConfirmation && {
            color: Color.Green,
            fontWeight: "bold"
        }
    };
};

const LocalAuthenticationPrompt__PromptButtonButton__Root: PressableStyle = function (pressableProps, pressableState)
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

const LocalAuthenticationPrompt__PromptButtonButton__Icon: IconStyle = function (iconProps)
{
    const pressableContext = PressableContextHook.usePressableContext();

    return {
        ...IconVariant.Default(iconProps),
        fontSize: 95,
        color: Color.White,
        opacity: pressableContext.state.pressed ? .2 : 1
    };
};

const LocalAuthenticationPrompt__PromptButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: LocalAuthenticationPrompt__PromptButtonButton__Root,
        Icon: LocalAuthenticationPrompt__PromptButtonButton__Icon
    };
};

export const Default: LocalAuthenticationPromptStyle = function ()
{
    return {
        Root: LocalAuthenticationPrompt__Root,
        Title: LocalAuthenticationPrompt__Title,
        Subtitle: LocalAuthenticationPrompt__Subtitle,
        PromptButton: LocalAuthenticationPrompt__PromptButton
    };
};

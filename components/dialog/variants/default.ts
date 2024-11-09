import {ButtonContextHook, type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {PressableContextHook, type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {type DialogStyle} from "../models";

const Dialog__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        justifyContent: "flex-start",
        minHeight: 700,
        paddingHorizontal: 20
    };
};

const Dialog__Title: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        marginTop: 65,
        fontSize: 24,
        fontWeight: "bold",
        color: Color.White
    };
};

const Dialog__Subtitle: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        alignSelf: "stretch",
        lineHeight: 28,
        marginTop: 55,
        fontSize: 16,
        textAlign: "center",
        color: Color.Neutral
    };
};

const Dialog__ConfirmButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        marginTop: 150,
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

const Dialog__ConfirmButton__Icon: IconStyle = function (iconProps)
{
    const pressableContext = PressableContextHook.usePressableContext();

    return {
        ...IconVariant.Default(iconProps),
        fontSize: 95,
        color: Color.White,
        opacity: pressableContext.state.pressed ? .2 : 1
    };
};

const Dialog__ConfirmButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: Dialog__ConfirmButton__Root,
        Icon: Dialog__ConfirmButton__Icon
    };
};

export const Default: DialogStyle = function ()
{
    return {
        Root: Dialog__Root,
        Title: Dialog__Title,
        Subtitle: Dialog__Subtitle,
        ConfirmButton: Dialog__ConfirmButton
    };
};

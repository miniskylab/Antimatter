import {Color} from "@miniskylab/antimatter-color-scheme";
import {type IconStyle} from "@miniskylab/antimatter-icon";
import {PressableContextHook, type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type TextStyle} from "@miniskylab/antimatter-text";
import {ButtonContextHook} from "../../hooks";
import {type ButtonStyle} from "../../models";
import * as ButtonVariant from "../../variants";

const Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        borderColor: Color.Red,
        backgroundColor: pressableState.pressed
            ? Color.Red
            : pressableState.hovered
                ? Color.Red__a10
                : Color.Transparent
    };
};

const Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : Color.Red
    };
};

const Button__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(textProps);

    return {
        ...inheritedStyle,
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : Color.Red
    };
};

export const OutlinedRectangularRed: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: Button__Root,
        Icon: Button__Icon,
        Label: Button__Label
    };
};

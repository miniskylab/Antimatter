import {Color} from "@miniskylab/antimatter-color-scheme";
import {type IconStyle} from "@miniskylab/antimatter-icon";
import {type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type TextStyle} from "@miniskylab/antimatter-text";
import {ButtonContextHook} from "../hooks";
import {type ButtonStyle} from "../models";
import {OutlinedRectangular} from "./outlined-rectangular";

const Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        ...pressableProps.disabled
            ? {
                borderColor: Color.Neutral,
                backgroundColor: Color.Neutral
            }
            : pressableState.pressed
                ? {
                    borderColor: Color.Primary__b10,
                    backgroundColor: Color.Primary__b10
                }
                : pressableState.hovered
                    ? {
                        borderColor: Color.Primary__w25,
                        backgroundColor: Color.Primary__w25
                    }
                    : {
                        borderColor: Color.Primary,
                        backgroundColor: Color.Primary
                    }
    };
};

const Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        color: Color.Ambient
    };
};

const Button__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = OutlinedRectangular(buttonContext.props).Label(textProps);

    return {
        ...inheritedStyle,
        color: Color.Ambient
    };
};

export const SolidRectangular: ButtonStyle = function (buttonProps)
{
    const inheritedStyle = OutlinedRectangular(buttonProps);

    return {
        ...inheritedStyle,
        Root: Button__Root,
        Icon: Button__Icon,
        Label: Button__Label
    };
};

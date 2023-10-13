import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {PressableContextHook, PressableStyle} from "@miniskylab/antimatter-pressable";
import {ButtonContextHook} from "../../hooks";
import {ButtonStyle} from "../../models";
import * as ButtonVariant from "../../variants";

const Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        borderColor: Color.Negative,
        backgroundColor: pressableState.pressed
            ? Color.Negative
            : pressableState.hovered
                ? Color.Negative__a10
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
                : Color.Negative
    };
};

const Button__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(labelProps);

    return {
        ...inheritedStyle,
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : Color.Negative
    };
};

export const OutlinedRectangularNegative: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: Button__Root,
        Icon: Button__Icon,
        Label: Button__Label
    };
};

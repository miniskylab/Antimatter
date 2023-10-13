import {IconStyle} from "@miniskylab/antimatter-icon";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ButtonContextHook} from "../../hooks";
import {ButtonStyle} from "../../models";
import * as ButtonVariant from "../../variants";

const Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: 68,
        height: 68,
        borderWidth: 4,
        borderRadius: 34
    };
};

const Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        fontSize: 40
    };
};

export const OutlinedCircularGigantic: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedCircular(buttonProps),
        Root: Button__Root,
        Icon: Button__Icon
    };
};

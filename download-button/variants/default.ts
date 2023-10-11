import {ButtonContextHook, ButtonVariant} from "@miniskylab/antimatter-button";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {DownloadButtonStyle} from "../models";

const DownloadButton__Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flexDirection: "row-reverse"
    };
};

const DownloadButton__Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        fontSize: 14
    };
};

export const Default: DownloadButtonStyle = function ()
{
    return function (buttonProps)
    {
        return {
            ...ButtonVariant.SolidRectangular(buttonProps),
            Root: DownloadButton__Button__Root,
            Icon: DownloadButton__Button__Icon
        };
    };
};

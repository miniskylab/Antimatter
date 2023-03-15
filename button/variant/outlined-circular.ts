import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {ButtonStyle} from "../model";

export const OutlinedCircular: ButtonStyle = function (buttonProps, buttonState)
{
    const buttonStyle: ReturnType<ButtonStyle> = {};

    buttonStyle.Root = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        borderRadius: 34 / 2,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Primary,
        cursor: "pointer",
        backgroundColor: buttonState.pressed
            ? Color.Primary
            : buttonState.hovered
                ? Color.Primary__a10
                : Color.Transparent,
        ...buttonProps.disabled && {
            opacity: .2,
            cursor: "not-allowed"
        }
    };

    buttonStyle.Icon = function (iconProps)
    {
        const defaultIconStyle = IconVariant.Default(iconProps);
        const iconStyle: ReturnType<IconStyle> = {...defaultIconStyle};

        iconStyle.Root = {
            ...defaultIconStyle.Root,
            fontSize: 14,
            color: buttonState.pressed
                ? Color.Ambient
                : buttonState.hovered
                    ? Color.White
                    : Color.Primary
        };

        return iconStyle;
    };

    buttonStyle.Label = function ()
    {
        return {
            Root: {
                display: "none"
            }
        };
    };

    return buttonStyle;
};

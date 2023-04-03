import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ButtonContextHook} from "../hook";
import {ButtonStyle} from "../model";

const Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const defaultIconStyle = IconVariant.Default(iconProps);
    const iconStyle: ReturnType<IconStyle> = {...defaultIconStyle};

    iconStyle.Root = {
        ...defaultIconStyle.Root,
        fontSize: 14,
        color: buttonContext.state.pressed
            ? Color.Ambient
            : buttonContext.state.hovered
                ? Color.White
                : Color.Primary
    };

    return iconStyle;
};

const Button__Label: LabelStyle = function ()
{
    return {
        Root: {
            display: "none"
        }
    };
};

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

    buttonStyle.Icon = Button__Icon;
    buttonStyle.Label = Button__Label;

    return buttonStyle;
};

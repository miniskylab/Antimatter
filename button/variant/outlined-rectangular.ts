import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconVariant} from "@miniskylab/antimatter-icon";
import {LabelVariant} from "@miniskylab/antimatter-label";
import {ButtonStyle} from "../model";

export const OutlinedRectangular: ButtonStyle = function (buttonProps, buttonState)
{
    const buttonStyle: ReturnType<typeof OutlinedRectangular> = {};

    buttonStyle.Root = {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 120,
        height: 34,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 0,
        borderWidth: 1,
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
        const iconStyle: ReturnType<typeof buttonStyle.Icon> = {...defaultIconStyle};

        iconStyle.Root = {
            ...defaultIconStyle.Root,
            minWidth: 16,
            height: 16,
            fontSize: 16,
            color: buttonState.pressed
                ? Color.Ambient
                : buttonState.hovered
                    ? Color.White
                    : Color.Primary
        };

        return iconStyle;
    };

    buttonStyle.Label = function (labelProps)
    {
        const defaultLabelStyle = LabelVariant.Default(labelProps);
        const labelStyle: ReturnType<typeof buttonStyle.Label> = {...defaultLabelStyle};

        labelStyle.Root = {
            ...defaultLabelStyle.Root,
            fontSize: 14,
            paddingVertical: 0,
            paddingHorizontal: 10,
            color: buttonState.pressed
                ? Color.Ambient
                : buttonState.hovered
                    ? Color.White
                    : Color.Primary
        };

        return labelStyle;
    };

    return buttonStyle;
};

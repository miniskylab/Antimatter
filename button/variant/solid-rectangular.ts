import {Color} from "@miniskylab/antimatter-color-scheme";
import {ButtonStyle} from "../model";
import {OutlinedRectangular} from "./outlined-rectangular";

export const SolidRectangular: ButtonStyle = function (buttonProps, buttonState)
{
    const outlinedRectangularButtonStyle = OutlinedRectangular(buttonProps, buttonState);
    const buttonStyle: ReturnType<typeof SolidRectangular> = {...outlinedRectangularButtonStyle};

    buttonStyle.Root = {
        ...outlinedRectangularButtonStyle.Root,
        borderColor: buttonState.pressed
            ? Color.Primary__b10
            : buttonState.hovered
                ? Color.Primary__w25
                : Color.Primary,
        backgroundColor: buttonState.pressed
            ? Color.Primary__b10
            : buttonState.hovered
                ? Color.Primary__w25
                : Color.Primary
    };

    buttonStyle.Icon = function (iconProps)
    {
        const inheritedIconStyle = outlinedRectangularButtonStyle.Icon(iconProps);
        const iconStyle: ReturnType<typeof buttonStyle.Icon> = {...inheritedIconStyle};

        iconStyle.Root = {
            ...inheritedIconStyle.Root,
            color: buttonState.pressed
                ? Color.Ambient
                : buttonState.hovered
                    ? Color.Ambient
                    : Color.Ambient
        };

        return iconStyle;
    };

    buttonStyle.Label = function (labelProps)
    {
        const inheritedLabelStyle = outlinedRectangularButtonStyle.Label(labelProps);
        const labelStyle: ReturnType<typeof buttonStyle.Label> = {...inheritedLabelStyle};

        labelStyle.Root = {
            ...inheritedLabelStyle.Root,
            color: buttonState.pressed
                ? Color.Ambient
                : buttonState.hovered
                    ? Color.Ambient
                    : Color.Ambient
        };

        return labelStyle;
    };

    return buttonStyle;
};

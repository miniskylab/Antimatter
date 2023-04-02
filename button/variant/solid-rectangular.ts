import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {Context} from "../hook";
import {ButtonStyle} from "../model";
import {OutlinedRectangular} from "./outlined-rectangular";

const Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = Context.useButtonContext();

    const inheritedIconStyle = OutlinedRectangular(buttonContext.props, buttonContext.state).Icon(iconProps);
    const iconStyle: ReturnType<IconStyle> = {...inheritedIconStyle};

    iconStyle.Root = {
        ...inheritedIconStyle.Root,
        color: Color.Ambient
    };

    return iconStyle;
};

const Button__Label: LabelStyle = function (labelProps)
{
    const buttonContext = Context.useButtonContext();

    const inheritedLabelStyle = OutlinedRectangular(buttonContext.props, buttonContext.state).Label(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        color: Color.Ambient
    };

    return labelStyle;
};

export const SolidRectangular: ButtonStyle = function (buttonProps, buttonState)
{
    const outlinedRectangularButtonStyle = OutlinedRectangular(buttonProps, buttonState);
    const buttonStyle: ReturnType<ButtonStyle> = {...outlinedRectangularButtonStyle};

    buttonStyle.Root = {
        ...outlinedRectangularButtonStyle.Root,
        ...buttonState.pressed
            ? {
                borderColor: Color.Primary__b10,
                backgroundColor: Color.Primary__b10
            }
            : buttonState.hovered
                ? {
                    borderColor: Color.Primary__w25,
                    backgroundColor: Color.Primary__w25
                }
                : {
                    borderColor: Color.Primary,
                    backgroundColor: Color.Primary
                }
    };

    buttonStyle.Icon = Button__Icon;
    buttonStyle.Label = Button__Label;

    return buttonStyle;
};

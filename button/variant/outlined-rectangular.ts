import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {useButtonContext} from "../hook";
import {ButtonStyle} from "../model";

const Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = useButtonContext();

    const defaultIconStyle = IconVariant.Default(iconProps);
    const iconStyle: ReturnType<IconStyle> = {...defaultIconStyle};

    iconStyle.Root = {
        ...defaultIconStyle.Root,
        minWidth: 16,
        height: 16,
        fontSize: 16,
        color: buttonContext.state.pressed
            ? Color.Ambient
            : buttonContext.state.hovered
                ? Color.White
                : Color.Primary
    };

    return iconStyle;
};

const Button__Label: LabelStyle = function (labelProps)
{
    const buttonContext = useButtonContext();

    const defaultLabelStyle = LabelVariant.Default(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

    labelStyle.Root = {
        ...defaultLabelStyle.Root,
        fontSize: 14,
        paddingVertical: 0,
        paddingHorizontal: 10,
        color: buttonContext.state.pressed
            ? Color.Ambient
            : buttonContext.state.hovered
                ? Color.White
                : Color.Primary
    };

    return labelStyle;
};

export const OutlinedRectangular: ButtonStyle = function (buttonProps, buttonState)
{
    const buttonStyle: ReturnType<ButtonStyle> = {};

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

    buttonStyle.Icon = Button__Icon;
    buttonStyle.Label = Button__Label;

    return buttonStyle;
};

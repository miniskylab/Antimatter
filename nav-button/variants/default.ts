import {ButtonContextHook, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {NavButtonAnimationHook} from "../hooks";
import {NavButtonStyle} from "../models";

const NavButton__Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flexDirection: "row-reverse",
        height: 50,
        paddingVertical: 6,
        paddingHorizontal: 15,
        userSelect: "none",
        ...pressableState.pressed
            ? {
                borderColor: Color.Gray__b10,
                backgroundColor: Color.Gray__b10
            }
            : pressableState.hovered
                ? {
                    borderColor: Color.Gray__w25,
                    backgroundColor: Color.Gray__w25
                }
                : {
                    borderColor: Color.Gray,
                    backgroundColor: Color.Gray
                }
    };
};

const NavButton__Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        minWidth: 25,
        fontSize: 18,
        animations: [
            () => NavButtonAnimationHook.useIconHoverAnimation()
        ]
    };
};

const NavButton__Button__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Label(labelProps);

    return {
        ...inheritedStyle,
        flexGrow: 1,
        alignItems: "flex-start",
        paddingLeft: 5,
        paddingRight: 15,
        fontSize: 16,
        fontWeight: "bold"
    };
};

export const Default: NavButtonStyle = function ()
{
    return function (buttonProps)
    {
        return {
            ...ButtonVariant.SolidRectangular(buttonProps),
            Root: NavButton__Button__Root,
            Icon: NavButton__Button__Icon,
            Label: NavButton__Button__Label
        };
    };
};

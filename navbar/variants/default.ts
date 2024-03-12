import {ButtonContextHook} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {NavButtonContextHook, NavButtonStyle, NavButtonVariant} from "@miniskylab/antimatter-nav-button";
import {PressableContextHook, PressableStyle} from "@miniskylab/antimatter-pressable";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {NavbarStyle} from "../models";

const Navbar__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        columnGap: 10,
        width: "100%",
        height: 55,
        backgroundColor: Color.Ambient,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 20,
        shadowColor: Color.White__a10,
        shadowOpacity: 1
    };
};

const Navbar__Tab__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const navButtonContext = NavButtonContextHook.useNavButtonContext();

    const inheritedStyle = NavButtonVariant.Default(navButtonContext.props)(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flexDirection: "column",
        alignSelf: "stretch",
        minWidth: 90,
        maxWidth: 90,
        height: "auto",
        paddingVertical: 0,
        paddingHorizontal: 0,
        opacity: 1,
        cursor: navButtonContext.props.disabled ? "default" : "pointer",
        ...pressableState.pressed
            ? {
                borderColor: Color.Primary,
                backgroundColor: Color.Primary
            }
            : {
                borderColor: Color.Transparent,
                backgroundColor: Color.Transparent
            }
    };
};

const Navbar__Tab__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const navButtonContext = NavButtonContextHook.useNavButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = NavButtonVariant.Default(navButtonContext.props)(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        animations: undefined,
        height: 32,
        paddingTop: 5,
        fontSize: 25,
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.props.disabled || pressableContext.state.hovered
                ? Color.Primary
                : Color.White
    };
};

const Navbar__Tab__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const navButtonContext = NavButtonContextHook.useNavButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = NavButtonVariant.Default(navButtonContext.props)(buttonContext.props).Label(textProps);

    return {
        ...inheritedStyle,
        height: 23,
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 13,
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.props.disabled || pressableContext.state.hovered
                ? Color.Primary
                : Color.White
    };
};

const Navbar__Tab: NavButtonStyle = function (navButtonProps)
{
    return function (buttonProps)
    {
        return {
            ...NavButtonVariant.Default(navButtonProps)(buttonProps),
            Root: Navbar__Tab__Root,
            Icon: Navbar__Tab__Icon,
            Label: Navbar__Tab__Label
        };
    };
};

export const Default: NavbarStyle = function ()
{
    return {
        Root: Navbar__Root,
        Tab: Navbar__Tab
    };
};

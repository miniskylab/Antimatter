import {ButtonContextHook, type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {CursorType} from "@miniskylab/antimatter-framework";
import {type IconStyle} from "@miniskylab/antimatter-icon";
import {PressableContextHook, type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type ScrollViewStyle, ScrollViewVariant} from "@miniskylab/antimatter-scroll-view";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type NavMenuStyle} from "../models";

const NavMenu__Root: ScrollViewStyle = function (viewProps)
{
    return {
        ...ScrollViewVariant.Default(viewProps),
        flex: 1,
        height: "100%",
        minWidth: 250,
        paddingTop: 25,
        paddingBottom: 75,
        backgroundColor: Color.Background
    };
};

const NavMenu__Category: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        alignItems: "stretch",
        alignSelf: "stretch",
        height: 36,
        marginTop: 10,
        paddingLeft: 25,
        fontSize: 14,
        fontWeight: "bold"
    };
};

const NavMenu__Link__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        justifyContent: "flex-start",
        alignSelf: "stretch",
        alignItems: "stretch",
        height: 36,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 25,
        paddingRight: 0,
        borderWidth: 0,
        backgroundColor: pressableState.pressed
            ? Color.Primary
            : Color.Transparent,
        ...pressableProps.disabled && {
            opacity: 1,
            cursor: CursorType.Default,
            height: 30,
            paddingLeft: 20,
            marginVertical: 3,
            borderLeftWidth: 5,
            borderLeftStyle: "solid",
            borderLeftColor: Color.Primary
        }
    };
};

const NavMenu__Link__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        height: undefined,
        fontSize: 14,
        color: pressableContext.props.disabled
            ? Color.Gainsboro
            : pressableContext.state.pressed
                ? Color.Ambient
                : pressableContext.state.hovered
                    ? Color.White
                    : Color.Neutral
    };
};

const NavMenu__Link__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(textProps);

    return {
        ...inheritedStyle,
        fontSize: 14,
        color: pressableContext.props.disabled
            ? Color.Gainsboro
            : pressableContext.state.pressed
                ? Color.Ambient
                : pressableContext.state.hovered
                    ? Color.White
                    : Color.Neutral
    };
};

const NavMenu__Link: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedCircular(buttonProps),
        Root: NavMenu__Link__Root,
        Icon: NavMenu__Link__Icon,
        Label: NavMenu__Link__Label
    };
};

export const Default: NavMenuStyle = function ()
{
    return {
        Root: NavMenu__Root,
        Category: NavMenu__Category,
        Link: NavMenu__Link
    };
};

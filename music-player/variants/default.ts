import {ButtonContextHook, ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {PressableContextHook, PressableStyle} from "@miniskylab/antimatter-pressable";
import {TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {MusicPlayerContextHook} from "../hooks";
import {MusicPlayerStyle} from "../models";

const MusicPlayer__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        minWidth: 400,
        maxWidth: 500,
        padding: 15,
        paddingBottom: 12,
        backgroundColor: Color.Background
    };
};

const MusicPlayer__Icon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        width: 50,
        height: 50,
        fontSize: 28,
        color: Color.Neutral,
        backgroundColor: Color.Ambient
    };
};

const MusicPlayer__TitleContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "space-around",
        height: 50,
        marginLeft: 10
    };
};

const MusicPlayer__MainTitle: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        width: "100%",
        fontSize: 18,
        fontWeight: "bold",
        color: Color.Neutral
    };
};

const MusicPlayer__Subtitle: TextStyle = function (textProps)
{
    return {
        ...MusicPlayer__MainTitle(textProps),
        fontSize: 15,
        fontWeight: "normal"
    };
};

const MusicPlayer__Row: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        flexBasis: "100%",
        paddingTop: 10
    };
};

const MusicPlayer__Timer: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        paddingLeft: 1,
        marginRight: "auto",
        fontSize: 15,
        fontWeight: "bold",
        color: Color.Neutral
    };
};

const MusicPlayer__ControlContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        columnGap: 15
    };
};

const MusicPlayer__Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const buttonTypeContext = MusicPlayerContextHook.useButtonTypeContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: 40,
        height: 40,
        borderColor: Color.Transparent,
        backgroundColor: Color.Transparent,
        ...buttonTypeContext === "playlist" && {
            marginLeft: "auto",
            transform: [{translateX: 10}]
        }
    };
};

const MusicPlayer__Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const buttonTypeContext = MusicPlayerContextHook.useButtonTypeContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        color: pressableContext.state.pressed
            ? Color.Primary
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral,
        fontSize: buttonTypeContext === "play-pause"
            ? 30
            : buttonTypeContext === "shuffle"
                ? 23
                : buttonTypeContext === "repeat"
                    ? 32
                    : 20
    };
};

const MusicPlayer__Button: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedCircular(buttonProps),
        Root: MusicPlayer__Button__Root,
        Icon: MusicPlayer__Button__Icon
    };
};

export const Default: MusicPlayerStyle = function ()
{
    return {
        Root: MusicPlayer__Root,
        Icon: MusicPlayer__Icon,
        TitleContainer: MusicPlayer__TitleContainer,
        MainTitle: MusicPlayer__MainTitle,
        Subtitle: MusicPlayer__Subtitle,
        Row: MusicPlayer__Row,
        Timer: MusicPlayer__Timer,
        ControlContainer: MusicPlayer__ControlContainer,
        Button: MusicPlayer__Button
    };
};

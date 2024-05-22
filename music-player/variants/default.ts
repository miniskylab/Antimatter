import {ButtonContextHook, type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {isEnvironment} from "@miniskylab/antimatter-framework";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {PressableContextHook, type PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {type ScrollViewStyle, ScrollViewVariant} from "@miniskylab/antimatter-scroll-view";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {SongRow} from "../components";
import {MusicPlayerContextHook} from "../hooks";
import {type MusicPlayerStyle} from "../models";

const MusicPlayer__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        alignItems: "stretch",
        minWidth: 400,
        maxWidth: 500,
        paddingTop: 15,
        backgroundColor: Color.Background
    };
};

const MusicPlayer__NowPlayingContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        alignItems: "stretch",
        columnGap: 10,
        height: 50,
        paddingHorizontal: 15
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
        justifyContent: "space-around"
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

const MusicPlayer__ControlContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        columnGap: 15,
        paddingTop: 12,
        paddingBottom: 18,
        paddingHorizontal: 15
    };
};

const MusicPlayer__Timer: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        paddingLeft: 1,
        marginRight: "auto",
        fontSize: 18,
        fontWeight: "bold",
        color: Color.Neutral
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

const MusicPlayer__SongList: ScrollViewStyle = function (scrollViewProps)
{
    const runningInsideWebBrowser = isEnvironment("WebBrowser");

    return {
        ...ScrollViewVariant.Default(scrollViewProps),
        minHeight: 434,
        paddingTop: 2,
        paddingBottom: 45,
        backgroundColor: Color.Ambient,
        ...runningInsideWebBrowser && {
            paddingBottom: 0,
            marginHorizontal: 15,
            marginBottom: 18
        }
    };
};

const MusicPlayer__SongRow__Root: PressableStyle = function (pressableProps, pressableState)
{
    const runningInsideWebBrowser = isEnvironment("WebBrowser");

    return {
        ...PressableVariant.Default(pressableProps, pressableState),
        flexDirection: "row",
        columnGap: 25,
        height: 49,
        paddingHorizontal: 16,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Neutral,
        marginTop: -2,
        ...runningInsideWebBrowser && {
            height: 38,
            paddingHorizontal: 12
        }
    };
};

const MusicPlayer__SongRow__SongName: TextStyle = function (textProps)
{
    const runningInsideWebBrowser = isEnvironment("WebBrowser");

    return {
        ...TextVariant.Default(textProps),
        flex: 1,
        fontSize: runningInsideWebBrowser ? 14 : 18,
        fontWeight: "bold",
        color: Color.Neutral
    };
};

const MusicPlayer__SongRow__SongDuration: TextStyle = function (textProps)
{
    const runningInsideWebBrowser = isEnvironment("WebBrowser");

    return {
        ...TextVariant.Default(textProps),
        fontSize: runningInsideWebBrowser ? 14 : 18,
        fontWeight: "bold",
        textAlign: "right",
        color: Color.Neutral
    };
};

const MusicPlayer__SongRow: SongRow.Style = function ()
{
    return {
        Root: MusicPlayer__SongRow__Root,
        SongName: MusicPlayer__SongRow__SongName,
        SongDuration: MusicPlayer__SongRow__SongDuration
    };
};

export const Default: MusicPlayerStyle = function ()
{
    return {
        Root: MusicPlayer__Root,
        NowPlayingContainer: MusicPlayer__NowPlayingContainer,
        Icon: MusicPlayer__Icon,
        TitleContainer: MusicPlayer__TitleContainer,
        MainTitle: MusicPlayer__MainTitle,
        Subtitle: MusicPlayer__Subtitle,
        ControlContainer: MusicPlayer__ControlContainer,
        Timer: MusicPlayer__Timer,
        Button: MusicPlayer__Button,
        SongList: MusicPlayer__SongList,
        SongRow: MusicPlayer__SongRow
    };
};

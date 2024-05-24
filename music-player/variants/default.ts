import {ButtonContextHook, type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {CursorType, isEnvironment, Layer} from "@miniskylab/antimatter-framework";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {PressableContextHook, type PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {type ScrollViewStyle, ScrollViewVariant} from "@miniskylab/antimatter-scroll-view";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {SongRow} from "../components";
import {RepeatMode} from "../enums";
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
        minHeight: 22,
        fontSize: 18,
        fontWeight: "bold",
        color: Color.Neutral
    };
};

const MusicPlayer__Subtitle: TextStyle = function (textProps)
{
    return {
        ...MusicPlayer__MainTitle(textProps),
        minHeight: 20,
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
        minWidth: 58,
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
    const musicPlayerContext = MusicPlayerContextHook.useMusicPlayerContext();

    const getButtonColor = (isInActiveState?: boolean) => pressableContext.state.pressed
        ? isInActiveState ? Color.Neutral : Color.Primary
        : pressableContext.state.hovered
            ? Color.White
            : isInActiveState ? Color.Primary : Color.Neutral;

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        fontSize: buttonTypeContext === "play-pause"
            ? 30
            : buttonTypeContext === "shuffle"
                ? 23
                : buttonTypeContext === "repeat"
                    ? 32
                    : 20,
        color: buttonTypeContext === "repeat"
            ? getButtonColor(musicPlayerContext.props.repeatMode !== RepeatMode.None)
            : buttonTypeContext === "shuffle"
                ? getButtonColor(musicPlayerContext.props.isShuffleEnabled)
                : buttonTypeContext === "playlist"
                    ? getButtonColor(musicPlayerContext.props.isPlaylistSelectionEnabled)
                    : getButtonColor()
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
    const isRunningInsideWebBrowser = isEnvironment("WebBrowser");

    return {
        ...ScrollViewVariant.Default(scrollViewProps),
        minHeight: 434,
        paddingTop: 2,
        paddingBottom: 45,
        backgroundColor: Color.Ambient,
        ...isRunningInsideWebBrowser && {
            paddingBottom: 0,
            marginHorizontal: 15,
            marginBottom: 18
        }
    };
};

const MusicPlayer__SongRow__Root: PressableStyle = function (pressableProps, pressableState)
{
    const songRowContext = SongRow.ContextHook.useSongRowContext();
    const musicPlayerContext = MusicPlayerContextHook.useMusicPlayerContext();

    const isRunningInsideWebBrowser = isEnvironment("WebBrowser");
    const isPressableAndHovered = songRowContext.props.onPress && pressableState.hovered;

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
        cursor: isPressableAndHovered ? CursorType.Pointer : CursorType.Default,
        ...isRunningInsideWebBrowser && {
            height: 38,
            paddingHorizontal: 12
        },
        ...musicPlayerContext.props.isPlaylistSelectionEnabled
            ? {
                borderColor: Color.Ambient,
                backgroundColor: songRowContext.props.isExcludedFromActivePlaylist ? Color.Tomato : Color.Green,
                ...pressableState.hovered && {
                    borderStyle: "dashed",
                    borderColor: Color.White,
                    zIndex: Layer.AlwaysOnTop
                },
                ...pressableState.pressed && {
                    borderStyle: "dashed",
                    borderColor: Color.White,
                    backgroundColor: Color.White,
                    zIndex: Layer.AlwaysOnTop
                }
            }
            : {
                ...pressableState.hovered && {
                    backgroundColor: Color.Neutral,
                    borderColor: Color.Neutral,
                    zIndex: Layer.AlwaysOnTop
                },
                ...pressableState.pressed && {
                    backgroundColor: Color.Primary,
                    borderColor: Color.Primary,
                    zIndex: Layer.AlwaysOnTop
                },
                ...songRowContext.props.isPlaying && {
                    backgroundColor: songRowContext.props.isExcludedFromActivePlaylist ? Color.Tomato : Color.Primary,
                    borderColor: songRowContext.props.isExcludedFromActivePlaylist ? Color.Tomato : Color.Primary,
                    zIndex: Layer.Higher
                }
            }
    };
};

const MusicPlayer__SongRow__SongName: TextStyle = function (textProps)
{
    const songRowContext = SongRow.ContextHook.useSongRowContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const musicPlayerContext = MusicPlayerContextHook.useMusicPlayerContext();

    const isRunningInsideWebBrowser = isEnvironment("WebBrowser");

    return {
        ...TextVariant.Default(textProps),
        flex: 1,
        fontSize: isRunningInsideWebBrowser ? 14 : 18,
        fontWeight: "bold",
        color: musicPlayerContext.props.isPlaylistSelectionEnabled
            ? Color.Ambient
            : songRowContext.props.isPlaying || pressableContext.state.hovered || pressableContext.state.pressed
                ? Color.Ambient
                : Color.Neutral
    };
};

const MusicPlayer__SongRow__SongDuration: TextStyle = function (textProps)
{
    const songRowContext = SongRow.ContextHook.useSongRowContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const musicPlayerContext = MusicPlayerContextHook.useMusicPlayerContext();

    const isRunningInsideWebBrowser = isEnvironment("WebBrowser");

    return {
        ...TextVariant.Default(textProps),
        minWidth: 45,
        fontSize: isRunningInsideWebBrowser ? 14 : 18,
        fontWeight: "bold",
        textAlign: "right",
        color: musicPlayerContext.props.isPlaylistSelectionEnabled
            ? Color.Ambient
            : songRowContext.props.isPlaying || pressableContext.state.hovered || pressableContext.state.pressed
                ? Color.Ambient
                : Color.Neutral
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

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
        minWidth: 390,
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
        paddingTop: 12,
        paddingBottom: 17,
        paddingHorizontal: 15
    };
};

const MusicPlayer__Timer: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        minWidth: 50,
        paddingLeft: 1,
        marginRight: "auto",
        fontSize: 18,
        fontWeight: "bold",
        color: Color.Neutral
    };
};

const MusicPlayer__ShuffleButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: 40,
        height: 40,
        marginRight: "auto",
        borderColor: Color.Transparent,
        backgroundColor: Color.Transparent
    };
};

const MusicPlayer__ShuffleButton__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const musicPlayerContext = MusicPlayerContextHook.useMusicPlayerContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        fontSize: 23,
        color: pressableContext.state.pressed
            ? Color.White
            : musicPlayerContext.props.isShuffleEnabled
                ? Color.Blue
                : Color.Neutral
    };
};

const MusicPlayer__ShuffleButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedCircular(buttonProps),
        Root: MusicPlayer__ShuffleButton__Root,
        Icon: MusicPlayer__ShuffleButton__Icon
    };
};

const MusicPlayer__PlayPreviousButton__Icon: IconStyle = function (iconProps)
{
    const pressableContext = PressableContextHook.usePressableContext();

    return {
        ...MusicPlayer__ShuffleButton__Icon(iconProps),
        fontSize: 20,
        color: pressableContext.state.pressed
            ? Color.Blue
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral
    };
};

const MusicPlayer__PlayPreviousButton: ButtonStyle = function (buttonProps)
{
    return {
        ...MusicPlayer__ShuffleButton(buttonProps),
        Icon: MusicPlayer__PlayPreviousButton__Icon
    };
};

const MusicPlayer__PlayPauseButton__Icon: IconStyle = function (iconProps)
{
    return {
        ...MusicPlayer__PlayPreviousButton__Icon(iconProps),
        fontSize: 30
    };
};

const MusicPlayer__PlayPauseButton: ButtonStyle = function (buttonProps)
{
    return {
        ...MusicPlayer__PlayPreviousButton(buttonProps),
        Icon: MusicPlayer__PlayPauseButton__Icon
    };
};

const MusicPlayer__PlayNextButton: ButtonStyle = function (buttonProps)
{
    return {
        ...MusicPlayer__PlayPreviousButton(buttonProps)
    };
};

const MusicPlayer__RepeatModeButton__Icon: IconStyle = function (iconProps)
{
    const pressableContext = PressableContextHook.usePressableContext();
    const musicPlayerContext = MusicPlayerContextHook.useMusicPlayerContext();

    return {
        ...MusicPlayer__ShuffleButton__Icon(iconProps),
        fontSize: 32,
        color: pressableContext.state.pressed
            ? Color.White
            : musicPlayerContext.props.repeatMode !== RepeatMode.None
                ? Color.Blue
                : Color.Neutral
    };
};

const MusicPlayer__RepeatModeButton: ButtonStyle = function (buttonProps)
{
    return {
        ...MusicPlayer__ShuffleButton(buttonProps),
        Icon: MusicPlayer__RepeatModeButton__Icon
    };
};

const MusicPlayer__PlaylistButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    return {
        ...MusicPlayer__ShuffleButton__Root(pressableProps, pressableState),
        alignItems: "flex-end",
        marginRight: 0
    };
};

const MusicPlayer__PlaylistButton__Icon: IconStyle = function (iconProps)
{
    const pressableContext = PressableContextHook.usePressableContext();
    const musicPlayerContext = MusicPlayerContextHook.useMusicPlayerContext();

    return {
        ...MusicPlayer__ShuffleButton__Icon(iconProps),
        fontSize: 25,
        color: pressableContext.state.pressed
            ? Color.White
            : musicPlayerContext.props.isPlaylistSelectionEnabled
                ? Color.Blue
                : Color.Neutral
    };
};

const MusicPlayer__PlaylistButton: ButtonStyle = function (buttonProps)
{
    return {
        ...MusicPlayer__ShuffleButton(buttonProps),
        Root: MusicPlayer__PlaylistButton__Root,
        Icon: MusicPlayer__PlaylistButton__Icon
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
            marginBottom: 15
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
        borderColor: Color.Mineshaft,
        marginTop: -2,
        cursor: isPressableAndHovered ? CursorType.Pointer : CursorType.Default,
        ...isRunningInsideWebBrowser && {
            height: 38,
            paddingHorizontal: 12
        },
        ...musicPlayerContext.props.isPlaylistSelectionEnabled
            ? {
                borderColor: Color.Ambient,
                backgroundColor: songRowContext.props.isExcludedFromActivePlaylist ? Color.Red : Color.Green,
                ...isRunningInsideWebBrowser && pressableState.hovered && {
                    borderStyle: "dashed",
                    borderColor: Color.White,
                    zIndex: Layer.AlwaysOnTop
                },
                ...isRunningInsideWebBrowser && pressableState.pressed && {
                    borderStyle: "solid",
                    borderColor: Color.Ambient,
                    backgroundColor: Color.White,
                    zIndex: Layer.AlwaysOnTop
                }
            }
            : {
                ...isRunningInsideWebBrowser && pressableState.hovered && {
                    backgroundColor: Color.Neutral,
                    borderColor: Color.Ambient,
                    zIndex: Layer.Higher
                },
                ...isRunningInsideWebBrowser && pressableState.pressed && {
                    backgroundColor: Color.White,
                    borderColor: Color.Ambient,
                    zIndex: Layer.Higher
                },
                ...songRowContext.props.isSelected && {
                    backgroundColor: songRowContext.props.isExcludedFromActivePlaylist ? Color.Red : Color.Blue,
                    borderColor: Color.Ambient,
                    zIndex: Layer.AlwaysOnTop
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
    const isHoveredOrPressed = pressableContext.state.hovered || pressableContext.state.pressed;

    return {
        ...TextVariant.Default(textProps),
        flex: 1,
        fontSize: isRunningInsideWebBrowser ? 14 : 17,
        fontWeight: !musicPlayerContext.props.isPlaylistSelectionEnabled && songRowContext.props.isSelected ? "bold" : "normal",
        color: musicPlayerContext.props.isPlaylistSelectionEnabled
            ? Color.Ambient
            : songRowContext.props.isSelected || (isRunningInsideWebBrowser && isHoveredOrPressed)
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
    const isHoveredOrPressed = pressableContext.state.hovered || pressableContext.state.pressed;

    return {
        ...TextVariant.Default(textProps),
        minWidth: 45,
        textAlign: "right",
        fontSize: isRunningInsideWebBrowser ? 14 : 17,
        fontWeight: !musicPlayerContext.props.isPlaylistSelectionEnabled && songRowContext.props.isSelected ? "bold" : "normal",
        color: musicPlayerContext.props.isPlaylistSelectionEnabled
            ? Color.Ambient
            : songRowContext.props.isSelected || (isRunningInsideWebBrowser && isHoveredOrPressed)
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
        ShuffleButton: MusicPlayer__ShuffleButton,
        PlayPreviousButton: MusicPlayer__PlayPreviousButton,
        PlayPauseButton: MusicPlayer__PlayPauseButton,
        PlayNextButton: MusicPlayer__PlayNextButton,
        RepeatModeButton: MusicPlayer__RepeatModeButton,
        PlaylistButton: MusicPlayer__PlaylistButton,
        SongList: MusicPlayer__SongList,
        SongRow: MusicPlayer__SongRow
    };
};

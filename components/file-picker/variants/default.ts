import {ButtonContextHook, type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {type IconStyle} from "@miniskylab/antimatter-icon";
import {PressableContextHook, type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type ScrollViewStyle, ScrollViewVariant} from "@miniskylab/antimatter-scroll-view";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {FileRow} from "../components";
import {type FilePickerStyle} from "../models";

const FilePicker__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        alignItems: "stretch",
        minWidth: 300,
        maxWidth: 450
    };
};

const FilePicker__Description: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        marginBottom: 5,
        color: Color.Neutral,
        fontSize: 16
    };
};

const FilePicker__ControlPanel: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        height: 60,
        paddingHorizontal: 20,
        backgroundColor: Color.Background
    };
};

const FilePicker__FileSelectionButton__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        alignSelf: "flex-start",
        flexDirection: "column",
        minWidth: undefined,
        height: "100%",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 5,
        paddingBottom: 4,
        borderWidth: 0,
        backgroundColor: Color.Transparent
    };
};

const FilePicker__FileSelectionButton__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        flexGrow: 1,
        fontSize: 28,
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral
    };
};

const FilePicker__FileSelectionButton__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(textProps);

    return {
        ...inheritedStyle,
        lineHeight: 15,
        marginTop: 3,
        paddingVertical: 0,
        paddingHorizontal: 0,
        fontSize: 12,
        fontWeight: "bold",
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral
    };
};

const FilePicker__FileSelectionButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: FilePicker__FileSelectionButton__Root,
        Icon: FilePicker__FileSelectionButton__Icon,
        Label: FilePicker__FileSelectionButton__Label
    };
};

const FilePicker__FileList: ScrollViewStyle = function (scrollViewProps)
{
    return {
        ...ScrollViewVariant.Default(scrollViewProps),
        maxHeight: 300,
        borderWidth: 1,
        borderTopWidth: 0,
        borderStyle: "solid",
        borderColor: Color.Background
    };
};

const FilePicker__FileRow__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        height: 61,
        marginTop: -1,
        borderTopWidth: 1,
        borderStyle: "solid",
        borderColor: Color.Background
    };
};

const FilePicker__FileRow__Title: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        display: "none"
    };
};

const FilePicker__FileRow__Subtitle: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        display: "none"
    };
};

const FilePicker__FileRow: FileRow.Style = function ()
{
    return {
        Root: FilePicker__FileRow__Root,
        Title: FilePicker__FileRow__Title,
        Subtitle: FilePicker__FileRow__Subtitle
    };
};

const FilePicker__Footnote: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        marginTop: 5,
        color: Color.Neutral,
        fontStyle: "italic",
        fontSize: 14
    };
};

export const Default: FilePickerStyle = function ()
{
    return {
        Root: FilePicker__Root,
        Description: FilePicker__Description,
        ControlPanel: FilePicker__ControlPanel,
        FileList: FilePicker__FileList,
        FileRow: FilePicker__FileRow,
        FileSelectionButton: FilePicker__FileSelectionButton,
        Footnote: FilePicker__Footnote
    };
};

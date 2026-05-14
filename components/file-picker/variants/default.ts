import {type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
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
        backgroundColor: Color.Background
    };
};

const FilePicker__SelectFileButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps)
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
        SelectFileButton: FilePicker__SelectFileButton,
        Footnote: FilePicker__Footnote
    };
};

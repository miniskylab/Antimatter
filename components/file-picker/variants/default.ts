import {type ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {type FilePickerStyle} from "../models";

const FilePicker__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps)
    };
};

const FilePicker__Description: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps)
    };
};

const FilePicker__SelectFileButton: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps)
    };
};

const FilePicker__Footnote: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps)
    };
};

export const Default: FilePickerStyle = function ()
{
    return {
        Root: FilePicker__Root,
        Description: FilePicker__Description,
        SelectFileButton: FilePicker__SelectFileButton,
        Footnote: FilePicker__Footnote
    };
};

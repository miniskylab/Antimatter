import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {FilePickerProps} from "./props";

export type FilePickerStyle = (filePickerProps: WithoutStyle<FilePickerProps>) => {
    Root: ViewStyle;
    Description: TextStyle;
    SelectFileButton: ButtonStyle;
    Footnote: TextStyle;
};

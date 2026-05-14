import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {FileRow} from "../components";
import {FilePickerProps} from "./props";

export type FilePickerStyle = (filePickerProps: WithoutStyle<FilePickerProps>) => {
    Root: ViewStyle;
    Description: TextStyle;
    ControlPanel: ViewStyle;
    FileList: ScrollViewStyle;
    FileRow: FileRow.Style;
    SelectFileButton: ButtonStyle;
    Footnote: TextStyle;
};

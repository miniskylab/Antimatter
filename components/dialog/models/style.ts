import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {DialogProps} from "./props";

export type DialogStyle = (dialogProps: WithoutStyle<DialogProps>) => {
    Root: ViewStyle;
    Title: TextStyle;
    Subtitle: TextStyle;
    ConfirmButton: ButtonStyle;
};

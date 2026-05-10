import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (fileRowProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    Title: TextStyle;
    Subtitle: TextStyle;
};

import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (pipsProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    Pip: ViewStyle;
    Label: TextStyle;
};

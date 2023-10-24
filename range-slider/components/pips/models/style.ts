import {Styled} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (pipsProps: Styled<Props>) => {
    Root: ViewStyle;
    Pip: ViewStyle;
    Label: LabelStyle;
};

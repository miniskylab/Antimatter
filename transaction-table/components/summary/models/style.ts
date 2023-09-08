import {Styled} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (summaryProps: Styled<Props>) => {
    Root?: ViewStyle;
    Row?: ViewStyle;
    Label?: LabelStyle;
    Amount?: LabelStyle;
};

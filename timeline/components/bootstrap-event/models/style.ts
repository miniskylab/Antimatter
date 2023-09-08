import {Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (bootstrapEventProps: Styled<Props>) => {
    Root?: ViewStyle;
    TriangleArrow?: ViewStyle;
    Icon?: IconStyle;
    Name?: LabelStyle;
    Description?: LabelStyle;
};

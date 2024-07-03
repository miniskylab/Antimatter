import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (bootstrapEventProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    TriangleArrow: ViewStyle;
    Icon: IconStyle;
    Name: TextStyle;
    Description: TextStyle;
};

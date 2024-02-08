import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {ProgressStripesProps} from "./props";

export type ProgressStripesStyle = (progressStripesProps: WithoutStyle<ProgressStripesProps>) => {
    Root: ViewStyle;
    Slider: ViewStyle;
    Stripe: ViewStyle;
};

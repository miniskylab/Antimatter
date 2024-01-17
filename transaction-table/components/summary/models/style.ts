import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {RangeSliderStyle} from "@miniskylab/antimatter-range-slider";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (summaryProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    Section: ViewStyle;
    Label: LabelStyle;
    Amount: LabelStyle;
    RangeSlider: RangeSliderStyle;
};

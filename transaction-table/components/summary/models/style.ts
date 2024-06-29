import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {RangeSliderStyle} from "@miniskylab/antimatter-range-slider";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (summaryProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    Section1: ViewStyle;
    Section1Label: TextStyle;
    Section1Amount: TextStyle;
    Section2: ViewStyle;
    Section2Label: TextStyle;
    Section2Amount: TextStyle;
    Indicator: ViewStyle;
    IndicatorIcon: TextStyle;
    IndicatorLabel: TextStyle;
    ProgressBar: RangeSliderStyle;
};

import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {RangeSliderStyle} from "@miniskylab/antimatter-range-slider";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (summaryProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    Section: ViewStyle;
    SectionLabel: TextStyle;
    SectionAmount: TextStyle;
    Indicator: ViewStyle;
    IndicatorIcon: TextStyle;
    IndicatorLabel: TextStyle;
    ProgressBar: RangeSliderStyle;
};

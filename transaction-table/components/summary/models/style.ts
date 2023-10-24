import {Styled} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {RangeSliderStyle} from "@miniskylab/antimatter-range-slider";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (summaryProps: Styled<Props>) => {
    Root?: ViewStyle;
    Section?: ViewStyle;
    Label?: LabelStyle;
    Amount?: LabelStyle;
    RangeSlider?: RangeSliderStyle;
};

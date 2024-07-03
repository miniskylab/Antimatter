import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Pips} from "../components";
import {RangeSliderProps} from "./props";

export type RangeSliderStyle = (rangeSliderProps: WithoutStyle<RangeSliderProps>) => {
    Root: ViewStyle;
    Track: ViewStyle;
    StopperLeft: ViewStyle;
    StopperRight: ViewStyle;
    FreeZone: ViewStyle;
    FillLeft: ViewStyle;
    FillRight: ViewStyle;
    Knob: ViewStyle;
    KnobIcon: IconStyle;
    Pips: Pips.Style;
};

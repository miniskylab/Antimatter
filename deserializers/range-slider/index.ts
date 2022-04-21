import {RangeSlider as RangeSliderComponent} from "@miniskylab/antimatter-range-slider";
import {RangeSliderDeserializerCreator} from "./deserializer-creator";

export const RangeSlider = new RangeSliderDeserializerCreator().createFrom(RangeSliderComponent);

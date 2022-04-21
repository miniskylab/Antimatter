import {CircularSlider as CircularSliderComponent} from "@miniskylab/antimatter-circular-slider";
import {CircularSliderDeserializerCreator} from "./deserializer-creator";

export const CircularSlider = new CircularSliderDeserializerCreator().createFrom(CircularSliderComponent);

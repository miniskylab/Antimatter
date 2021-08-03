import {ComponentName, Decorator} from "antimatter/infrastructures";
import {CircularSliderComponent} from "./circular-slider-component";
import {CircularSliderComponentProps} from "./models/circular-slider-component-props";
import {CircularSliderExporter} from "./models/circular-slider-exporter";

export const CircularSliderComponentName = Decorator.getValue(ComponentName, CircularSliderComponentProps) as string;

export {CircularSliderComponent};
export {CircularSliderComponentProps};

export {CircularSliderVariant} from "./variants";
export type {CircularSliderExportProps as CircularSliderProps} from "./models/circular-slider-export-props";
export const CircularSlider = new CircularSliderExporter().export(CircularSliderComponent);

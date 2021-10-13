import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructure";
import {RangeSliderComponentProps} from "./models/range-slider-component-props";
import {RangeSliderExporter} from "./models/range-slider-exporter";
import {RangeSliderComponent} from "./range-slider-component";

export const RangeSliderComponentName = Decorator.getValue(ComponentName, RangeSliderComponentProps) as string;

export {RangeSliderComponent};
export {RangeSliderComponentProps};

export {RangeSliderVariant} from "./variants";
export {RangeSliderPipSettings} from "./models/range-slider-pip-settings";
export type {RangeSliderExportProps as RangeSliderProps} from "./models/range-slider-export-props";
export const RangeSlider = new RangeSliderExporter().export(RangeSliderComponent);

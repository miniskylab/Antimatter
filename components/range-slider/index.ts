import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {RangeSliderComponentProps} from "./models/range-slider-component-props";
import {RangeSliderExporter} from "./models/range-slider-exporter";
import {RangeSliderComponent} from "./range-slider-component";

export const RangeSliderComponentName = Decorator.getValue<string>(ComponentName, RangeSliderComponentProps);

export {RangeSliderComponent};
export {RangeSliderComponentProps};

export {RangeSliderVariant} from "./variants";
export {RangeSliderPipSettings} from "./models/range-slider-pip-settings";
export type {RangeSliderExportProps as RangeSliderProps} from "./models/range-slider-export-props";
export const RangeSlider = new RangeSliderExporter().export(RangeSliderComponent);

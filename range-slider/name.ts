import {Decorator} from "@miniskylab/antimatter-decorator";
import {ComponentName} from "@miniskylab/antimatter-model";
import {RangeSliderProps} from "./model";

export const Name = Decorator.getValue<string>(ComponentName, RangeSliderProps);

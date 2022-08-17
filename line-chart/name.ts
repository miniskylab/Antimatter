import {Decorator} from "@miniskylab/antimatter-decorator";
import {ComponentName} from "@miniskylab/antimatter-model";
import {LineChartProps} from "./model";

export const Name = Decorator.getValue<string>(ComponentName, LineChartProps);

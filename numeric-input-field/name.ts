import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {NumericInputFieldProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, NumericInputFieldProps);

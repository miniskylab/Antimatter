import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {NumericInputFieldProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, NumericInputFieldProps);

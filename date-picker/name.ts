import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {DatePickerProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, DatePickerProps);

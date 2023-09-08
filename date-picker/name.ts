import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {DatePickerProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, DatePickerProps);

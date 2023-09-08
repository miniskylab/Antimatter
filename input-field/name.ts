import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {InputFieldProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, InputFieldProps);

import {Decorator} from "@miniskylab/antimatter-decorator";
import {ComponentName as ComponentNameDecorator} from "@miniskylab/antimatter-model";
import {InputFieldProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, InputFieldProps);

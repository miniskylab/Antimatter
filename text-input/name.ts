import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {TextInputProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, TextInputProps);

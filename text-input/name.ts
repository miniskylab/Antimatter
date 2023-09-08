import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {TextInputProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, TextInputProps);

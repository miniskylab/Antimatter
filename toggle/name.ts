import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {ToggleProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, ToggleProps);

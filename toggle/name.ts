import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {ToggleProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, ToggleProps);

import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {PressableProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, PressableProps);

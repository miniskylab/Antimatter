import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {PressableProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, PressableProps);

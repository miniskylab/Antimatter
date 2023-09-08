import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {TransitionProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, TransitionProps);

import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {TransitionProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, TransitionProps);

import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {ViewProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, ViewProps);

import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {ViewProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, ViewProps);

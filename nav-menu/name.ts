import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {NavMenuProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, NavMenuProps);

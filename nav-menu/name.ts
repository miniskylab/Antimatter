import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {NavMenuProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, NavMenuProps);

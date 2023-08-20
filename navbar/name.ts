import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {NavbarProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, NavbarProps);

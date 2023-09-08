import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {NavbarProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, NavbarProps);

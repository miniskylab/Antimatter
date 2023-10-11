import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {NavButtonProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, NavButtonProps);

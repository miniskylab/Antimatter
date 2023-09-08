import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {ButtonProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, ButtonProps);

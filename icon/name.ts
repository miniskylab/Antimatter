import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {IconProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, IconProps);

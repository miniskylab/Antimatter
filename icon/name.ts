import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {IconProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, IconProps);

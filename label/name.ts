import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {LabelProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, LabelProps);

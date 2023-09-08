import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {LabelProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, LabelProps);

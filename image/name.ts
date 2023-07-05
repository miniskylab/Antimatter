import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {ImageProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, ImageProps);

import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {ImageProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, ImageProps);

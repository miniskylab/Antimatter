import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {HeadingProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, HeadingProps);

import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {HeadingProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, HeadingProps);

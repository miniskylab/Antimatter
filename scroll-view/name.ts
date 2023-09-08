import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {ScrollViewProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, ScrollViewProps);

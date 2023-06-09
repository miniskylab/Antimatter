import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {ScrollViewProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, ScrollViewProps);

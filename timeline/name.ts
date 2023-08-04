import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {TimelineProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, TimelineProps);

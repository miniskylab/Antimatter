import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {TimelineProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, TimelineProps);

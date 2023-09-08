import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {CalendarProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, CalendarProps);

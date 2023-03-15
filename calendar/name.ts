import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {CalendarProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, CalendarProps);

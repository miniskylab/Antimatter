import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {FooterProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, FooterProps);

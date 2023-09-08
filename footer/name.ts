import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {FooterProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, FooterProps);

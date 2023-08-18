import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {LoginFormProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, LoginFormProps);

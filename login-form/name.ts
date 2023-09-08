import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {LoginFormProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, LoginFormProps);

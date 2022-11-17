import {Decorator} from "@miniskylab/antimatter-decorator";
import {ComponentName as ComponentNameDecorator} from "@miniskylab/antimatter-model";
import {LabelProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, LabelProps);

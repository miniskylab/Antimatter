import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {DataTableProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, DataTableProps);

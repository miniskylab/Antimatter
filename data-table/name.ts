import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {DataTableProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, DataTableProps);

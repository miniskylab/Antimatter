import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {TransactionTableProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, TransactionTableProps);

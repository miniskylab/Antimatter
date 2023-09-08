import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {TransactionTableProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, TransactionTableProps);

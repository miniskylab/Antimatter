import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {TransactionTableProps} from "./props";
import {type TransactionTableState} from "./state";

export const TransactionTableContext = createContext<TransactionTableContext>(undefined);
export type TransactionTableContext = ComponentContext<TransactionTableProps, TransactionTableState>;

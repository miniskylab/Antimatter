import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {TransactionTableProps} from "./props";
import {TransactionTableState} from "./state";

export const TransactionTableContext = createContext<TransactionTableContext>({});
export type TransactionTableContext = ComponentContext<TransactionTableProps, TransactionTableState>;

export const ControlButtonTypeContext = createContext<ControlButtonTypeContext>(undefined);
export type ControlButtonTypeContext = "action" | "mode" | "cancel";

export const HrPositionContext = createContext<HrPositionContext>(undefined);
export type HrPositionContext = "top" | "bottom";

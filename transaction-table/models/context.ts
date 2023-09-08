import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {TransactionTableProps} from "./props";

export const TransactionTableContext = createContext<TransactionTableContext>({});
export type TransactionTableContext = ComponentContext<TransactionTableProps>;

export const ControlButtonTypeContext = createContext<ControlButtonTypeContext>(undefined);
export type ControlButtonTypeContext = "action" | "mode" | "cancel";

export const HrPositionContext = createContext<HrPositionContext>(undefined);
export type HrPositionContext = "top" | "bottom";

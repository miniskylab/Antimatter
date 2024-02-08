import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {ControlButtonType} from "../types";
import {TransactionTableProps} from "./props";
import {TransactionTableRef} from "./ref";
import {TransactionTableState} from "./state";

export const TransactionTableContext = createContext<TransactionTableContext>(undefined);
export type TransactionTableContext = ComponentContext<TransactionTableProps, TransactionTableState, TransactionTableRef>;

export const ControlButtonTypeContext = createContext<ControlButtonTypeContext>(undefined);
export type ControlButtonTypeContext = ControlButtonType | undefined;

export const HrPositionContext = createContext<HrPositionContext>(undefined);
export type HrPositionContext = "top" | "bottom" | undefined;

import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import type {ControlButtonType} from "../types";
import {TransactionTableProps} from "./props";
import {type TransactionTableState} from "./state";

export const TransactionTableContext = createContext<TransactionTableContext>(undefined);
export type TransactionTableContext = ComponentContext<TransactionTableProps, TransactionTableState>;

export const ControlButtonTypeContext = createContext<ControlButtonTypeContext>(undefined);
export type ControlButtonTypeContext = ControlButtonType | undefined;

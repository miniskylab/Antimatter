import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {DataTableProps} from "./props";

export const DataTableContext = createContext<DataTableContext>({});
export type DataTableContext = ComponentContext<DataTableProps>;

export const ControlButtonTypeContext = createContext<ControlButtonTypeContext>(undefined);
export type ControlButtonTypeContext = "action" | "mode" | "cancel";

export const RowTypeContext = createContext<RowTypeContext>(undefined);
export type RowTypeContext = "header" | "empty";

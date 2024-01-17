import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {ControlButtonType} from "../types";
import {DataTableProps} from "./props";

export const DataTableContext = createContext<DataTableContext>(undefined);
export type DataTableContext = ComponentContext<DataTableProps>;

export const ControlButtonTypeContext = createContext<ControlButtonTypeContext>(undefined);
export type ControlButtonTypeContext = ControlButtonType | undefined;

export const RowTypeContext = createContext<RowTypeContext>(undefined);
export type RowTypeContext = "header" | "data" | "empty" | undefined;

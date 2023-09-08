import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";
import {State} from "./state";

export const RowContext = createContext<RowContext>({});
export type RowContext = ComponentContext<Props, State>;

export const ColumnIndexContext = createContext<ColumnIndexContext>(undefined);
export type ColumnIndexContext = number;

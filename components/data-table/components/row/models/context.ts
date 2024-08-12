import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {type Props} from "./props";
import {type State} from "./state";

export const RowContext = createContext<RowContext>(undefined);
export type RowContext = ComponentContext<Props, State>;

export const ColumnIndexContext = createContext<ColumnIndexContext>(undefined);
export type ColumnIndexContext = number | undefined;

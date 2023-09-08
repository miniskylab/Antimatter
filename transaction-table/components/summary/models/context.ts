import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const SummaryContext = createContext<SummaryContext>({});
export type SummaryContext = ComponentContext<Props>;

export const RowContext = createContext<RowContext>(undefined);
export type RowContext = "income" | "expense";

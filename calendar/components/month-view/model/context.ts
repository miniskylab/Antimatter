import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {MonthInfo} from "./month-info";
import {Props} from "./props";

export const MonthViewContext = createContext<MonthViewContext>({});
export type MonthViewContext = ComponentContext<Props>;

export const MonthContext = createContext<MonthContext>(undefined);
export type MonthContext = MonthInfo;

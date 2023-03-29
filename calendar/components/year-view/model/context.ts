import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";
import {YearInfo} from "./year-info";

export const YearViewContext = createContext<YearViewContext>({});
export type YearViewContext = ComponentContext<Props>;

export const YearContext = createContext<YearContext>(undefined);
export type YearContext = YearInfo;

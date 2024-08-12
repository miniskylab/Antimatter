import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import type {YearInfo} from "../types";
import {type Props} from "./props";

export const YearViewContext = createContext<YearViewContext>(undefined);
export type YearViewContext = ComponentContext<Props>;

export const YearContext = createContext<YearContext>(undefined);
export type YearContext = YearInfo | undefined;

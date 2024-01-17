import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {DateInfo} from "../types";
import {Props} from "./props";

export const DateViewContext = createContext<DateViewContext>(undefined);
export type DateViewContext = ComponentContext<Props>;

export const DateContext = createContext<DateContext>(undefined);
export type DateContext = DateInfo;

import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import type {DateInfo} from "../types";
import {type Props} from "./props";

export const DateViewContext = createContext<DateViewContext>(undefined);
export type DateViewContext = ComponentContext<Props>;

export const DateContext = createContext<DateContext>(undefined);
export type DateContext = DateInfo | undefined;

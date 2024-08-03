import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {ProgressStripesProps} from "./props";
import {type ProgressStripesState} from "./state";

export const ProgressStripesContext = createContext<ProgressStripesContext>(undefined);
export type ProgressStripesContext = ComponentContext<ProgressStripesProps, ProgressStripesState>;

export const StripeIndexContext = createContext<StripeIndexContext>(undefined);
export type StripeIndexContext = number | undefined;

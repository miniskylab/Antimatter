import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const SummaryContext = createContext<SummaryContext>(undefined);
export type SummaryContext = ComponentContext<Props>;

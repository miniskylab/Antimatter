import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const SummaryContext = createContext<SummaryContext>(undefined);
export type SummaryContext = ComponentContext<Props>;

export const SectionContext = createContext<SectionContext>(undefined);
export type SectionContext = "section-1" | "section-2" | undefined;

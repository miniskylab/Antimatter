import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const PipsContext = createContext<PipsContext>(undefined);
export type PipsContext = ComponentContext<Props>;

export const HighlightedContext = createContext<HighlightedContext>(undefined);
export type HighlightedContext = boolean | undefined;

export const MilestoneContext = createContext<MilestoneContext>(undefined);
export type MilestoneContext = boolean | undefined;

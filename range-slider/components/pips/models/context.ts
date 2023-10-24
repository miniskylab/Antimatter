import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const PipsContext = createContext<PipsContext>({});
export type PipsContext = ComponentContext<Props>;

export const HighlightedContext = createContext<HighlightedContext>(undefined);
export type HighlightedContext = boolean;

export const MilestoneContext = createContext<MilestoneContext>(undefined);
export type MilestoneContext = boolean;

import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {TimelineProps} from "./props";

export const TimelineContext = createContext<TimelineContext>(undefined);
export type TimelineContext = ComponentContext<TimelineProps>;

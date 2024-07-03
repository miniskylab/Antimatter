import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const TimeFrameForecastDataContext = createContext<TimeFrameForecastDataContext>(undefined);
export type TimeFrameForecastDataContext = ComponentContext<Props>;

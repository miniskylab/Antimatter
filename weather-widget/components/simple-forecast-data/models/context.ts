import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const SimpleForecastDataContext = createContext<SimpleForecastDataContext>(undefined);
export type SimpleForecastDataContext = ComponentContext<Props>;

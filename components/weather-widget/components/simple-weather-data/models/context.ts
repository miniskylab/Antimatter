import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const SimpleWeatherDataContext = createContext<SimpleWeatherDataContext>(undefined);
export type SimpleWeatherDataContext = ComponentContext<Props>;

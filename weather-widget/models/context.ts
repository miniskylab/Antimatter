import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {WeatherWidgetProps} from "./props";

export const WeatherWidgetContext = createContext<WeatherWidgetContext>(undefined);
export type WeatherWidgetContext = ComponentContext<WeatherWidgetProps>;

export const SimpleWeatherDataPositionContext = createContext<SimpleWeatherDataPositionContext>(undefined);
export type SimpleWeatherDataPositionContext = "left" | "middle" | "right" | undefined;

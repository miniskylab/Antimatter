import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {WeatherWidgetContext} from "../models";

export function useWeatherWidgetContext(): NonNullable<WeatherWidgetContext> { return useContextOrThrow(WeatherWidgetContext); }

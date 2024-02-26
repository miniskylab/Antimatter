import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {PositionContext, WeatherWidgetContext} from "../models";

export function useWeatherWidgetContext(): NonNullable<WeatherWidgetContext> { return useContextOrThrow(WeatherWidgetContext); }

export function usePositionContext(): NonNullable<PositionContext> { return useContextOrThrow(PositionContext); }

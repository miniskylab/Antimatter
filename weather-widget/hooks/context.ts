import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {SimpleWeatherDataPositionContext, WeatherWidgetContext} from "../models";

export function useWeatherWidgetContext(): NonNullable<WeatherWidgetContext> { return useContextOrThrow(WeatherWidgetContext); }

export function useSimpleWeatherDataPositionContext(): NonNullable<SimpleWeatherDataPositionContext>
{
    return useContextOrThrow(SimpleWeatherDataPositionContext);
}

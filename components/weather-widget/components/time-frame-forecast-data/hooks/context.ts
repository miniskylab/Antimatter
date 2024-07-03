import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {TimeFrameForecastDataContext} from "../models";

export function useTimeFrameForecastDataContext(): NonNullable<TimeFrameForecastDataContext>
{
    return useContextOrThrow(TimeFrameForecastDataContext);
}

import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {SimpleForecastDataContext} from "../models";

export function useSimpleForecastDataContext(): NonNullable<SimpleForecastDataContext>
{
    return useContextOrThrow(SimpleForecastDataContext);
}

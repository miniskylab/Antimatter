import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {SimpleWeatherDataContext} from "../models";

export function useSimpleWeatherDataContext(): NonNullable<SimpleWeatherDataContext> { return useContextOrThrow(SimpleWeatherDataContext); }

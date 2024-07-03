import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {RangeSliderContext} from "../models";

export function useRangeSliderContext(): NonNullable<RangeSliderContext> { return useContextOrThrow(RangeSliderContext); }

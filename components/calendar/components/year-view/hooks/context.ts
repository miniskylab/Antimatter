import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {YearContext, YearViewContext} from "../models";

export function useYearViewContext(): NonNullable<YearViewContext> { return useContextOrThrow(YearViewContext); }

export function useYearContext(): NonNullable<YearContext> { return useContextOrThrow(YearContext); }

import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {MonthContext, MonthViewContext} from "../models";

export function useMonthViewContext(): NonNullable<MonthViewContext> { return useContextOrThrow(MonthViewContext); }

export function useMonthContext(): NonNullable<MonthContext> { return useContextOrThrow(MonthContext); }

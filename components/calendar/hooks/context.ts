import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {CalendarContext} from "../models";

export function useCalendarContext(): NonNullable<CalendarContext> { return useContextOrThrow(CalendarContext); }

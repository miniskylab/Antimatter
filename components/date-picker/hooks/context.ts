import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {DatePickerContext} from "../models";

export function useDatePickerContext(): NonNullable<DatePickerContext> { return useContextOrThrow(DatePickerContext); }

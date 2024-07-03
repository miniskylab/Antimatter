import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {NumericInputFieldContext} from "../models";

export function useNumericInputFieldContext(): NonNullable<NumericInputFieldContext> { return useContextOrThrow(NumericInputFieldContext); }

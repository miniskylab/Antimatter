import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {SummaryContext} from "../models";

export function useSummaryContext(): NonNullable<SummaryContext> { return useContextOrThrow(SummaryContext); }

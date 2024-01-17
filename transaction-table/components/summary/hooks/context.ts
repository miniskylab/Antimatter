import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {SectionContext, SummaryContext} from "../models";

export function useSummaryContext(): NonNullable<SummaryContext> { return useContextOrThrow(SummaryContext); }

export function useSectionContext(): NonNullable<SectionContext> { return useContextOrThrow(SectionContext); }

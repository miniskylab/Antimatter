import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {HighlightedContext, MilestoneContext, PipsContext} from "../models";

export function usePipsContext(): NonNullable<PipsContext> { return useContextOrThrow(PipsContext); }

export function useHighlightedContext(): NonNullable<HighlightedContext> { return useContextOrThrow(HighlightedContext); }

export function useMilestoneContext(): NonNullable<MilestoneContext> { return useContextOrThrow(MilestoneContext); }

import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {TimelineContext} from "../models";

export function useTimelineContext(): NonNullable<TimelineContext> { return useContextOrThrow(TimelineContext); }

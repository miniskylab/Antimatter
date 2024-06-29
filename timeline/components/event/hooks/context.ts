import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {EventContext} from "../models";

export function useEventContext(): NonNullable<EventContext> { return useContextOrThrow(EventContext); }

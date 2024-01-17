import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {EventContext, RowContext} from "../models";

export function useEventContext(): NonNullable<EventContext> { return useContextOrThrow(EventContext); }

export function useRowContext(): NonNullable<RowContext> { return useContextOrThrow(RowContext); }

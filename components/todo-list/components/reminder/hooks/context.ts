import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ReminderContext, TagIdContext} from "../models";

export function useReminderContext(): NonNullable<ReminderContext> { return useContextOrThrow(ReminderContext); }

export function useTagIdContext(): NonNullable<TagIdContext> { return useContextOrThrow(TagIdContext); }

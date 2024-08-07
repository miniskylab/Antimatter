import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ReminderContext} from "../models";

export function useReminderContext(): NonNullable<ReminderContext> { return useContextOrThrow(ReminderContext); }

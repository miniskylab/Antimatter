import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ReminderItemContext} from "../models";

export function useReminderItemContext(): NonNullable<ReminderItemContext> { return useContextOrThrow(ReminderItemContext); }

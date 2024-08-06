import {ReminderItem} from "../components";

export type ReminderState = {
    readonly toBeDeletedReminderItems: Record<string, ReminderItem.Data>;
};

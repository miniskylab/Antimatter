import {Reminder} from "../components";

export type TodoListState = {
    readonly previousReminders: Record<string, Reminder.Data>;
    readonly toBeDeletedReminders: Record<string, Reminder.Data>;
};

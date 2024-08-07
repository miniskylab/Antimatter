import {Reminder} from "../components";

export type TodoListState = {
    readonly toBeDeletedReminders: Record<string, Reminder.Data>;
};

import {Reminder} from "../components";

export type ReminderChangeData = Omit<Reminder.Data, "modifiedDate" | "createdDate">;

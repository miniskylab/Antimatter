import {ReminderItem} from "../components";

export type ReminderItemChangeData = Omit<ReminderItem.Data, "modifiedDate" | "createdDate">;

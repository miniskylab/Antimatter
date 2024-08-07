import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {DataListStyle} from "@miniskylab/data-list";
import {ReminderItem} from "../components";
import {ReminderProps} from "./props";
import {ReminderState} from "./state";

export type ReminderStyle = (reminderProps: WithoutStyle<ReminderProps>, reminderState: ReminderState) => {
    Root: DataListStyle;
    ReminderItem: ReminderItem.Style;
};

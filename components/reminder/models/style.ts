import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {ReminderProps} from "./props";

export type ReminderStyle = (reminderProps: WithoutStyle<ReminderProps>) => {
    Root: ViewStyle;
};

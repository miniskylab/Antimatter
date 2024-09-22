import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {PendingStatus} from "../enums";
import {type Props} from "./props";

export const ReminderContext = createContext<ReminderContext>(undefined);
export type ReminderContext = ComponentContext<Props, undefined, {
    readonly isDue: boolean;
    readonly isOverdue: boolean;
    readonly pendingStatus: PendingStatus;
}>;

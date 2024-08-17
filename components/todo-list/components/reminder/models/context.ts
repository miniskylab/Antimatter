import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {type Props} from "./props";
import {type State} from "./state";

export const ReminderContext = createContext<ReminderContext>(undefined);
export type ReminderContext = ComponentContext<Props, State, {
    readonly isDue: boolean;
    readonly isOverdue: boolean;
    readonly isCompleted: boolean;
}>;

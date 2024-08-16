import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {type Props} from "./props";

export const ReminderContext = createContext<ReminderContext>(undefined);
export type ReminderContext = ComponentContext<Props, undefined, {
    readonly isMarkedAsDone: boolean;
    readonly isNotificationSnoozed: boolean;
    readonly dueDuration: number | undefined;
}>;

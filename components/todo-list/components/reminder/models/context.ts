import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {type Props} from "./props";

export const ReminderContext = createContext<ReminderContext>(undefined);
export type ReminderContext = ComponentContext<Props, undefined, {
    readonly isPrioritized: boolean;
    readonly isOverdue: boolean;
    readonly isDue: boolean;
}>;

export const TagIdContext = createContext<TagIdContext>(undefined);
export type TagIdContext = string | undefined;

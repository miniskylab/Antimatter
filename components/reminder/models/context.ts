import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {ReminderProps} from "./props";

export const ReminderContext = createContext<ReminderContext>(undefined);
export type ReminderContext = ComponentContext<ReminderProps>;

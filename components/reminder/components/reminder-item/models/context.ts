import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const ReminderItemContext = createContext<ReminderItemContext>(undefined);
export type ReminderItemContext = ComponentContext<Props>;

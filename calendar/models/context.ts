import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {CalendarProps} from "./props";
import {CalendarState} from "./state";

export const CalendarContext = createContext<CalendarContext>(undefined);
export type CalendarContext = ComponentContext<CalendarProps, CalendarState>;

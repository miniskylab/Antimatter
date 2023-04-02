import {useContext} from "react";
import {CalendarContext} from "../model";

export function useCalendarContext(): CalendarContext { return useContext(CalendarContext); }

import {useContext} from "react";
import {CalendarContext} from "../models";

export function useCalendarContext(): CalendarContext { return useContext(CalendarContext); }

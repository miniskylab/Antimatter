import {GregorianCalendar} from "@miniskylab/antimatter-typescript";
import {CalendarTimeFrame} from "../models/calendar-time-frame";
import {CalendarView} from "../models/calendar-view";

export function canNavigateForward(calendarView: CalendarView, calendarTimeFrame: CalendarTimeFrame): boolean
{
    switch (calendarView)
    {
        case CalendarView.Date:
        {
            return calendarTimeFrame.monthAndYear.getFullYear() < GregorianCalendar.MAX_YEAR
                   ||
                   (
                       calendarTimeFrame.monthAndYear.getFullYear() === GregorianCalendar.MAX_YEAR
                       &&
                       calendarTimeFrame.monthAndYear.getMonth() < GregorianCalendar.MAX_MONTH
                   );
        }

        case CalendarView.Month:
        {
            return calendarTimeFrame.monthAndYear.getFullYear() < GregorianCalendar.MAX_YEAR;
        }

        case CalendarView.Year:
        {
            return calendarTimeFrame.decade + GregorianCalendar.YEAR_COUNT_IN_DECADE < GregorianCalendar.MAX_YEAR;
        }

        default:
        {
            return false;
        }
    }
}

export function canNavigateBackward(calendarView: CalendarView, calendarTimeFrame: CalendarTimeFrame): boolean
{
    switch (calendarView)
    {
        case CalendarView.Date:
        {
            return calendarTimeFrame.monthAndYear.getFullYear() > GregorianCalendar.MIN_YEAR
                   ||
                   (
                       calendarTimeFrame.monthAndYear.getFullYear() === GregorianCalendar.MIN_YEAR
                       &&
                       calendarTimeFrame.monthAndYear.getMonth() > GregorianCalendar.MIN_MONTH
                   );
        }

        case CalendarView.Month:
        {
            return calendarTimeFrame.monthAndYear.getFullYear() > GregorianCalendar.MIN_YEAR;
        }

        case CalendarView.Year:
        {
            return calendarTimeFrame.decade > GregorianCalendar.MIN_YEAR;
        }

        default:
        {
            return false;
        }
    }
}

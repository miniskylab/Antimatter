import {GregorianCalendar} from "@miniskylab/antimatter-typescript";
import {TimeFrame} from "../models/time-frame";
import {View} from "../models/view";

export function canNavigateForward(view: View, timeFrame: TimeFrame): boolean
{
    switch (view)
    {
        case View.Date:
        {
            return timeFrame.monthAndYear.getFullYear() < GregorianCalendar.MAX_YEAR
                   ||
                   (
                       timeFrame.monthAndYear.getFullYear() === GregorianCalendar.MAX_YEAR
                       &&
                       timeFrame.monthAndYear.getMonth() < GregorianCalendar.MAX_MONTH
                   );
        }

        case View.Month:
        {
            return timeFrame.monthAndYear.getFullYear() < GregorianCalendar.MAX_YEAR;
        }

        case View.Year:
        {
            return timeFrame.decade + GregorianCalendar.YEAR_COUNT_IN_DECADE < GregorianCalendar.MAX_YEAR;
        }

        default:
        {
            return false;
        }
    }
}

export function canNavigateBackward(view: View, timeFrame: TimeFrame): boolean
{
    switch (view)
    {
        case View.Date:
        {
            return timeFrame.monthAndYear.getFullYear() > GregorianCalendar.MIN_YEAR
                   ||
                   (
                       timeFrame.monthAndYear.getFullYear() === GregorianCalendar.MIN_YEAR
                       &&
                       timeFrame.monthAndYear.getMonth() > GregorianCalendar.MIN_MONTH
                   );
        }

        case View.Month:
        {
            return timeFrame.monthAndYear.getFullYear() > GregorianCalendar.MIN_YEAR;
        }

        case View.Year:
        {
            return timeFrame.decade > GregorianCalendar.MIN_YEAR;
        }

        default:
        {
            return false;
        }
    }
}

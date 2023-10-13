import {DayOfWeek, Decade, GregorianCalendar, Ts} from "@miniskylab/antimatter-framework";
import {DateView, MonthView, YearView} from "../components";
import {ViewType} from "../enums";
import {View} from "../types";

export function canNavigateForward(view: View): boolean
{
    switch (view.type)
    {
        case ViewType.Date:
        {
            return view.timeFrame.monthAndYear.getFullYear() < GregorianCalendar.MAX_YEAR
                   ||
                   (
                       view.timeFrame.monthAndYear.getFullYear() === GregorianCalendar.MAX_YEAR
                       &&
                       view.timeFrame.monthAndYear.getMonth() < GregorianCalendar.MAX_MONTH
                   );
        }

        case ViewType.Month:
        {
            return view.timeFrame.monthAndYear.getFullYear() < GregorianCalendar.MAX_YEAR;
        }

        case ViewType.Year:
        {
            return view.timeFrame.decade + GregorianCalendar.YEAR_COUNT_IN_DECADE < GregorianCalendar.MAX_YEAR;
        }

        default:
        {
            return false;
        }
    }
}

export function canNavigateBackward(view: View): boolean
{
    switch (view.type)
    {
        case ViewType.Date:
        {
            return view.timeFrame.monthAndYear.getFullYear() > GregorianCalendar.MIN_YEAR
                   ||
                   (
                       view.timeFrame.monthAndYear.getFullYear() === GregorianCalendar.MIN_YEAR
                       &&
                       view.timeFrame.monthAndYear.getMonth() > GregorianCalendar.MIN_MONTH
                   );
        }

        case ViewType.Month:
        {
            return view.timeFrame.monthAndYear.getFullYear() > GregorianCalendar.MIN_YEAR;
        }

        case ViewType.Year:
        {
            return view.timeFrame.decade > GregorianCalendar.MIN_YEAR;
        }

        default:
        {
            return false;
        }
    }
}

export function getDateViewData(month: Date): DateView.DateInfo[][]
{
    const dayCount = 42;
    const firstMondayIndex = 7;
    const mondayCount = 6;

    const date = new Date(month);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);

    const firstMonday = date.getDay() !== DayOfWeek.Monday
        ? GregorianCalendar.getNearestPrevMonday(date)
        : date.getDate() - GregorianCalendar.DAY_COUNT_IN_WEEK + 1;

    date.setDate(firstMonday);

    let week: DateView.DateInfo[] = [];
    const dateViewData: DateView.DateInfo[][] = [];
    const mondayIndices: number[] = [];
    for (let index = 1; index <= mondayCount; index++)
    {
        mondayIndices.push(firstMondayIndex * index);
    }

    for (let i = 0; i <= dayCount; i++)
    {
        if (mondayIndices.indexOf(i) >= 0)
        {
            dateViewData.push(week);
            week = [];
        }

        week.push({value: new Date(date), isExtraneous: !Ts.Date.isEqualMonth(date, month)});
        date.setDate(date.getDate() + 1);
    }

    return dateViewData;
}

export function getMonthViewData(year: number): MonthView.MonthInfo[]
{
    const monthViewData: MonthView.MonthInfo[] = [];
    const month = new Date(year, 0, 1);
    for (let monthIndex = 0; monthIndex < GregorianCalendar.MONTH_COUNT_IN_YEAR; monthIndex++)
    {
        month.setMonth(monthIndex);
        monthViewData.push({value: new Date(month), isExtraneous: false});
    }

    if (year < GregorianCalendar.MAX_YEAR)
    {
        monthViewData.push({value: new Date(year + 1, 0, 1), isExtraneous: true});
        monthViewData.push({value: new Date(year + 1, 1, 1), isExtraneous: true});
        monthViewData.push({value: new Date(year + 1, 2, 1), isExtraneous: true});
        monthViewData.push({value: new Date(year + 1, 3, 1), isExtraneous: true});
    }
    else
    {
        monthViewData.unshift({value: new Date(year - 1, 11, 1), isExtraneous: true});
        monthViewData.unshift({value: new Date(year - 1, 10, 1), isExtraneous: true});
        monthViewData.unshift({value: new Date(year - 1, 9, 1), isExtraneous: true});
        monthViewData.unshift({value: new Date(year - 1, 8, 1), isExtraneous: true});
    }

    return monthViewData;
}

export function getYearViewData(decade: Decade): YearView.YearInfo[]
{
    const yearViewData: YearView.YearInfo[] = [];
    const nextDecade = (decade + GregorianCalendar.YEAR_COUNT_IN_DECADE) as Decade;
    for (let year = decade; year < nextDecade; year++)
    {
        yearViewData.push({value: year, isExtraneous: false});
    }

    yearViewData.unshift({value: decade - 1, isExtraneous: true});
    yearViewData.unshift({value: decade - 2, isExtraneous: true});
    yearViewData.unshift({value: decade - 3, isExtraneous: true});

    yearViewData.push({value: nextDecade, isExtraneous: true});
    yearViewData.push({value: nextDecade + 1, isExtraneous: true});
    yearViewData.push({value: nextDecade + 2, isExtraneous: true});

    return yearViewData;
}

export function getViewId(view: View): string
{
    switch (view.type)
    {
        case ViewType.Date:
        {
            return `${ViewType.Date}-${view.timeFrame.monthAndYear.toISOString()}`;
        }

        case ViewType.Month:
        {
            return `${ViewType.Month}-${view.timeFrame.monthAndYear.getFullYear()}`;
        }

        case ViewType.Year:
        {
            return `${ViewType.Year}-${view.timeFrame.decade}`;
        }
    }
}

import {DayOfWeek, GregorianCalendar} from "@miniskylab/antimatter-typescript";

export function getDateViewData(displayingMonth: Date): Date[][]
{
    const dayCount = 42;
    const firstMondayIndex = 7;
    const mondayCount = 6;

    displayingMonth = new Date(displayingMonth);
    displayingMonth.setDate(1);
    displayingMonth.setHours(0, 0, 0, 0);
    const firstMonday = displayingMonth.getDay() !== DayOfWeek.Monday
        ? GregorianCalendar.getNearestPrevMonday(displayingMonth)
        : displayingMonth.getDate() - GregorianCalendar.DAY_COUNT_IN_WEEK + 1;
    displayingMonth.setDate(firstMonday);

    let week: Date[] = [];
    const dateViewData: Date[][] = [];
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

        week.push(new Date(displayingMonth));
        displayingMonth.setDate(displayingMonth.getDate() + 1);
    }

    return dateViewData;
}

import {EMPTY_STRING} from "../typescript";
import {DateFormat} from "./date-format";
import {TimeUnit} from "./time-unit";
import {Decade} from "./types";

export const GregorianCalendar = new class
{
    readonly MIN_DAY = 1;
    readonly MAX_DAY = 31;
    readonly MIN_MONTH = 0;
    readonly MAX_MONTH = 11;
    readonly MIN_YEAR = 1900;
    readonly MAX_YEAR = 2099;
    readonly MAX_WEEK_COUNT = 52;
    readonly DAY_COUNT_IN_WEEK = 7;
    readonly MONTH_COUNT_IN_YEAR = 12;
    readonly YEAR_COUNT_IN_DECADE = 10;

    isValidYear(year: number): boolean
    {
        if (!year) return false;
        if (isNaN(year)) return false;

        return (this.MIN_YEAR <= year && year <= this.MAX_YEAR);
    }

    isLeapYear(year: number): boolean
    {
        if (!this.isValidYear(year)) return false;

        return new Date(year, 1, 29).getDate() === 29;
    }

    isValidMonth(month: number): boolean
    {
        if (month === null || month === undefined) return false;
        if (isNaN(month)) return false;

        return (this.MIN_MONTH <= month && month <= this.MAX_MONTH);
    }

    isValidDay(day: number, month: number, year: number): boolean
    {
        if (!this.isValidYear(year)) return false;
        if (!this.isValidMonth(month)) return false;
        const maxDay = new Date(year, month + 1, 0).getDate();
        if (!day) return false;
        if (isNaN(day)) return false;

        return (this.MIN_DAY <= day && day <= maxDay);
    }

    getNearestPrevMonday(date: Date = new Date()): number
    {
        const clonedDate = new Date(date);
        clonedDate.setHours(0, 0, 0, 0);
        const dayStepToNearestPrevMonday = -(clonedDate.getDay() + (this.DAY_COUNT_IN_WEEK - 1)) % this.DAY_COUNT_IN_WEEK;

        return clonedDate.getDate() + dayStepToNearestPrevMonday;
    }

    getWeekNumber(date: Date = new Date()): number
    {
        const clonedDate = new Date(date);
        clonedDate.setHours(0, 0, 0, 0);
        const millisecondCountInDay = 86400000;
        const nearestPrevMonday = new Date(clonedDate);
        nearestPrevMonday.setDate(this.getNearestPrevMonday(clonedDate));

        // January 4th is always in week 1.
        const fourthDay = 4;
        const fourthOfJanuary = new Date(clonedDate.getFullYear(), 0, fourthDay);
        const firstMondayOfFirstWeek = new Date(fourthOfJanuary);
        firstMondayOfFirstWeek.setDate(this.getNearestPrevMonday(fourthOfJanuary));
        const distanceToFirstWeekInMillisecond = nearestPrevMonday.getTime() - firstMondayOfFirstWeek.getTime();
        const distanceToFirstWeekInDate = distanceToFirstWeekInMillisecond / millisecondCountInDay;

        return Math.round(distanceToFirstWeekInDate / this.DAY_COUNT_IN_WEEK) + 1;
    }

    getFullMonthName(month: number): string
    {
        if (!this.isValidMonth(month)) return;
        const fullNameOfMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        return fullNameOfMonths[month];
    }

    getShortMonthName(month: number): string
    {
        if (!this.isValidMonth(month)) return;
        const shortNameOfMonths = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        return shortNameOfMonths[month];
    }

    getDecade(year: number = new Date().getFullYear()): Decade
    {
        if (!this.isValidYear(year)) return undefined;
        let decadeFirstYear = year;
        while (decadeFirstYear % this.YEAR_COUNT_IN_DECADE !== 0) decadeFirstYear--;

        return decadeFirstYear as Decade;
    }

    getTimeDuration(startDate: Date, endDate: Date, minimumTimeUnit: TimeUnit): string
    {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        if (minimumTimeUnit > TimeUnit.Day)
        {
            startDate?.setDate(1);
            endDate?.setDate(28);
        }

        if (minimumTimeUnit === TimeUnit.Year)
        {
            startDate?.setMonth(0);
            endDate?.setMonth(11);
        }

        const millisecondCountInDay = 86400000;
        let dayCount = (endDate.getTime() - startDate.getTime()) / millisecondCountInDay;

        const dayCountInNonLeapYear = 365;
        const dayCountInAstronomicalYear = 365.25;
        const hasFebruary29 = (dayCount: number): boolean =>
        {
            const dayCountIn4ConsecutiveYears = 1461;
            if (dayCount >= dayCountIn4ConsecutiveYears) return true;

            let leapYear: number;
            for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++)
            {
                if (this.isLeapYear(year))
                {
                    leapYear = year;
                    break;
                }
            }

            return startDate.getTime() <= new Date(leapYear, 1, 29).getTime();
        };
        const dayCountInYear = hasFebruary29(dayCount) ? dayCountInAstronomicalYear : dayCountInNonLeapYear;
        let yearCount = Math.trunc(dayCount / dayCountInYear);

        dayCount %= dayCountInYear;
        const averageDayCountInMonth = 30.4375;
        let monthCount = Math.trunc(dayCount / averageDayCountInMonth);
        dayCount = Math.trunc(dayCount % averageDayCountInMonth);

        if (minimumTimeUnit > TimeUnit.Day)
        {
            if (dayCount >= 15) monthCount++;
            dayCount = 0;
        }

        if (minimumTimeUnit === TimeUnit.Year)
        {
            if (monthCount >= 6) yearCount++;
            monthCount = 0;
        }

        const tokenize = (unitCount: number, timeUnit: TimeUnit): string =>
            unitCount > 0
                ? `${unitCount} ${TimeUnit[timeUnit]}${unitCount > 1 ? "s" : EMPTY_STRING}`
                : EMPTY_STRING;
        const tokens: string[] = [];
        if (yearCount > 0) tokens.push(tokenize(yearCount, TimeUnit.Year));
        if (monthCount > 0) tokens.push(tokenize(monthCount, TimeUnit.Month));
        if (dayCount > 0) tokens.push(tokenize(dayCount, TimeUnit.Day));

        return tokens.join(", ");
    }

    toString(date: Date, format = DateFormat.Short, minimumTimeUnit = TimeUnit.Day): string
    {
        if (!date) return EMPTY_STRING;
        switch (format)
        {
            case DateFormat.Short:
                return date.toLocaleDateString("vi-VN", {
                    day: minimumTimeUnit === TimeUnit.Day ? "2-digit" : undefined,
                    month: minimumTimeUnit < TimeUnit.Year ? "2-digit" : undefined,
                    year: "numeric"
                }).replace(/\//g, " / ");
            case DateFormat.Long:
                return date.toLocaleDateString("en-US", {
                    day: minimumTimeUnit === TimeUnit.Day ? "2-digit" : undefined,
                    month: minimumTimeUnit < TimeUnit.Year ? "long" : undefined,
                    year: "numeric"
                });
            case DateFormat.Full:
                return date.toLocaleDateString("en-US", {
                    weekday: minimumTimeUnit === TimeUnit.Day ? "long" : undefined,
                    day: minimumTimeUnit === TimeUnit.Day ? "2-digit" : undefined,
                    month: minimumTimeUnit < TimeUnit.Year ? "long" : undefined,
                    year: "numeric"
                });
        }
    }
};

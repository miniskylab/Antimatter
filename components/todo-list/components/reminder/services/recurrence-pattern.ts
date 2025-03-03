import {EMPTY_STRING, GregorianCalendar, isNullOrUndefined} from "@miniskylab/antimatter-framework";
import {DueDateType} from "../enums";

export function getDueDuration(today: Date, dueDate: Date | undefined): number | undefined
{
    return dueDate
        ? GregorianCalendar.getDayCount(today, dueDate, true)
        : undefined;
}

export function getFormattedDueDuration(dueDuration: number | undefined): string | undefined
{
    return isNullOrUndefined(dueDuration)
        ? undefined
        : dueDuration === 0
            ? "Today"
            : dueDuration > 0
                ? dueDuration === 1 ? "Tomorrow" : `In ${dueDuration} days`
                : dueDuration === -1 ? "Yesterday" : `${Math.abs(dueDuration)} days ago`;
}

export function getDueDate(recurrencePattern: string | undefined, dueDateType: DueDateType, today: Date): Date | undefined
{
    if (isNullOrUndefined(recurrencePattern) || !isValidRecurrencePattern(recurrencePattern))
    {
        return undefined;
    }

    const executionTime = new Date(today);
    const cronTokens = recurrencePattern.split(" ");
    if (cronTokens.length === 4)
    {
        const [cronSecondToken, cronMinuteToken, cronHourToken, cronDayToken] = cronTokens;
        const cronSecondValue = Number(cronSecondToken);
        const cronMinuteValue = Number(cronMinuteToken);
        const cronHourValue = Number(cronHourToken);
        const cronDayValue = Number(cronDayToken);
        const msRecurrenceDuration = cronSecondValue * 1000 +
                                     cronMinuteValue * 60 * 1000 +
                                     cronHourValue * 60 * 60 * 1000 +
                                     cronDayValue * 24 * 60 * 60 * 1000;

        if (msRecurrenceDuration === 0)
        {
            return undefined;
        }
        else if (dueDateType === DueDateType.NextDueDate)
        {
            executionTime.setTime(executionTime.getTime() + msRecurrenceDuration);
        }
        else if (dueDateType === DueDateType.PreviousDueDate)
        {
            executionTime.setTime(executionTime.getTime() - msRecurrenceDuration);
        }
    }
    else if (cronTokens.length === 7)
    {
        if (tryParseExactTime(recurrencePattern, executionTime))
        {
            return executionTime;
        }

        const [cronSecondToken, cronMinuteToken, cronHourToken, cronDateToken, cronMonthToken, cronDayToken, cronYearToken] = cronTokens;
        if (dueDateType === DueDateType.NextDueDate)
        {
            executionTime.setSeconds(executionTime.getSeconds() + 1);
            while (true)
            {
                if (tryParseCronYearTokenForward(cronYearToken, executionTime)) continue;
                if (tryParseCronMonthTokenForward(cronMonthToken, executionTime)) continue;
                if (tryParseCronDateTokenForward(cronDateToken, executionTime)) continue;
                if (tryParseCronDayTokenForward(cronDayToken, executionTime)) continue;
                if (tryParseCronHourTokenForward(cronHourToken, executionTime)) continue;
                if (tryParseCronMinuteTokenForward(cronMinuteToken, executionTime)) continue;
                if (tryParseCronSecondTokenForward(cronSecondToken, executionTime)) continue;
                break;
            }
        }
        else if (dueDateType === DueDateType.PreviousDueDate)
        {
            executionTime.setSeconds(executionTime.getSeconds() - 1);
            while (true)
            {
                if (tryParseCronYearTokenBackward(cronYearToken, executionTime)) continue;
                if (tryParseCronMonthTokenBackward(cronMonthToken, executionTime)) continue;
                if (tryParseCronDateTokenBackward(cronDateToken, executionTime)) continue;
                if (tryParseCronDayTokenBackward(cronDayToken, executionTime)) continue;
                if (tryParseCronHourTokenBackward(cronHourToken, executionTime)) continue;
                if (tryParseCronMinuteTokenBackward(cronMinuteToken, executionTime)) continue;
                if (tryParseCronSecondTokenBackward(cronSecondToken, executionTime)) continue;
                break;
            }
        }
    }

    return executionTime;
}

export function isDurationRecurrencePattern(recurrencePattern: string | undefined)
{
    const durationRecurrencePatternRegex = new RegExp("^\\d{1,4} \\d{1,4} \\d{1,4} \\d{1,4}$");
    return durationRecurrencePatternRegex.test(recurrencePattern ?? EMPTY_STRING);
}

function isCronRecurrencePattern(recurrencePattern: string | undefined)
{
    if (isNullOrUndefined(recurrencePattern))
    {
        return false;
    }

    const questionMarkCount = (recurrencePattern.match(/ \? /g) || []).length;
    const pointInTimeRecurrencePatternRegex = new RegExp(
        "^(\\*|([1-5]?[0-9])) " +
        "(\\*|([1-5]?[0-9])) " +
        "(\\*|([0-9]|1[0-9]|2[0-3])) " +
        "(\\*|([1-9]|[12][0-9]|3[01])|\\?) " +
        "(\\*|([1-9]|1[0-2])) " +
        "(\\*|([1-7],)?([1-7],)?([1-7],)?([1-7],)?([1-7],)?([1-7],)?[1-7]|\\?) " +
        "(\\*|(\\*\\/)?((19|20)[0-9][0-9]))$"
    );

    return (questionMarkCount === 1 && pointInTimeRecurrencePatternRegex.test(recurrencePattern));
}

function isValidRecurrencePattern(recurrencePattern: string): boolean
{
    return isCronRecurrencePattern(recurrencePattern) || isDurationRecurrencePattern(recurrencePattern);
}

function tryParseExactTime(recurrencePattern: string, nextExecutionTime: Date): boolean
{
    const [cronSecondToken, cronMinuteToken, cronHourToken, cronDateToken, cronMonthToken, , cronYearToken] = recurrencePattern.split(" ");
    if (!recurrencePattern.includes("*"))
    {
        nextExecutionTime.setFullYear(Number(cronYearToken), Number(cronMonthToken) - 1, Number(cronDateToken));
        nextExecutionTime.setHours(Number(cronHourToken), Number(cronMinuteToken), Number(cronSecondToken), 0);
        return true;
    }

    return false;
}

function tryParseCronYearTokenForward(cronYearToken: string, nextExecutionTime: Date): boolean
{
    const cronYearValue = Number(cronYearToken);
    const nextExecutionYear = nextExecutionTime.getFullYear();
    if (cronYearToken !== "*" && nextExecutionYear < cronYearValue)
    {
        nextExecutionTime.setFullYear(nextExecutionTime.getFullYear() + 1, 0, 1);
        nextExecutionTime.setHours(0, 0, 0);
        return true;
    }

    return false;
}

function tryParseCronMonthTokenForward(cronMonthToken: string, nextExecutionTime: Date): boolean
{
    const cronMonthValue = Number(cronMonthToken) - 1;
    const nextExecutionMonth = nextExecutionTime.getMonth();
    if (cronMonthToken !== "*" && nextExecutionMonth !== cronMonthValue)
    {
        if (nextExecutionMonth > cronMonthValue)
        {
            nextExecutionTime.setFullYear(nextExecutionTime.getFullYear() + 1, 0, 1);
        }
        else
        {
            nextExecutionTime.setMonth(nextExecutionTime.getMonth() + 1, 1);
        }

        nextExecutionTime.setHours(0, 0, 0);
        return true;
    }

    return false;
}

function tryParseCronDateTokenForward(cronDateToken: string, nextExecutionTime: Date): boolean
{
    const cronDateValue = Number(cronDateToken);
    const nextExecutionDate = nextExecutionTime.getDate();
    if (cronDateToken !== "*" && cronDateToken !== "?" && nextExecutionDate !== cronDateValue)
    {
        if (nextExecutionDate > cronDateValue)
        {
            nextExecutionTime.setMonth(nextExecutionTime.getMonth() + 1, 1);
        }
        else
        {
            nextExecutionTime.setDate(nextExecutionDate + 1);
        }

        nextExecutionTime.setHours(0, 0, 0);
        return true;
    }

    return false;
}

function tryParseCronDayTokenForward(cronDayToken: string, nextExecutionTime: Date): boolean
{
    const cronDayValues = cronDayToken.split(",").map(Number);
    const nextExecutionDay = nextExecutionTime.getDay() + 1;
    if (cronDayToken !== "*" && cronDayToken !== "?" && !cronDayValues.includes(nextExecutionDay))
    {
        if (nextExecutionDay !== 1 && !cronDayValues.includes(1) && nextExecutionDay > Math.max(...cronDayValues))
        {
            nextExecutionTime.setDate(nextExecutionTime.getDate() + (9 - nextExecutionDay));
        }
        else
        {
            nextExecutionTime.setDate(nextExecutionTime.getDate() + 1);
        }

        nextExecutionTime.setHours(0, 0, 0);
        return true;
    }

    return false;
}

function tryParseCronHourTokenForward(cronHourToken: string, nextExecutionTime: Date): boolean
{
    const cronHourValue = Number(cronHourToken);
    const nextExecutionHour = nextExecutionTime.getHours();
    if (cronHourToken !== "*" && nextExecutionHour !== cronHourValue)
    {
        if (nextExecutionHour > cronHourValue)
        {
            nextExecutionTime.setDate(nextExecutionTime.getDate() + 1);
            nextExecutionTime.setHours(0);
        }
        else
        {
            nextExecutionTime.setHours(nextExecutionHour + 1);
        }

        nextExecutionTime.setMinutes(0);
        nextExecutionTime.setSeconds(0);
        return true;
    }

    return false;
}

function tryParseCronMinuteTokenForward(cronMinuteToken: string, nextExecutionTime: Date): boolean
{
    const cronMinuteValue = Number(cronMinuteToken);
    const nextExecutionMinute = nextExecutionTime.getMinutes();
    if (cronMinuteToken !== "*" && nextExecutionMinute !== cronMinuteValue)
    {
        if (nextExecutionMinute > cronMinuteValue)
        {
            nextExecutionTime.setHours(nextExecutionTime.getHours() + 1);
            nextExecutionTime.setMinutes(0);
        }
        else
        {
            nextExecutionTime.setMinutes(nextExecutionMinute + 1);
        }

        nextExecutionTime.setSeconds(0);
        return true;
    }

    return false;
}

function tryParseCronSecondTokenForward(cronSecondToken: string, nextExecutionTime: Date): boolean
{
    const cronSecondValue = Number(cronSecondToken);
    const nextExecutionSecond = nextExecutionTime.getSeconds();
    if (cronSecondToken !== "*" && nextExecutionSecond !== cronSecondValue)
    {
        if (nextExecutionSecond > cronSecondValue)
        {
            nextExecutionTime.setMinutes(nextExecutionTime.getMinutes() + 1);
            nextExecutionTime.setSeconds(0);
        }
        else
        {
            nextExecutionTime.setSeconds(nextExecutionSecond + 1);
        }

        return true;
    }

    return false;
}

function tryParseCronYearTokenBackward(cronYearToken: string, previousExecutionTime: Date): boolean
{
    const cronYearValue = Number(cronYearToken);
    const previousExecutionYear = previousExecutionTime.getFullYear();
    if (cronYearToken !== "*" && previousExecutionYear > cronYearValue)
    {
        previousExecutionTime.setFullYear(previousExecutionTime.getFullYear() - 1, 11, 1);
        previousExecutionTime.setMonth(previousExecutionTime.getMonth() + 1, 0);
        previousExecutionTime.setHours(23, 59, 59);
        return true;
    }

    return false;
}

function tryParseCronMonthTokenBackward(cronMonthToken: string, previousExecutionTime: Date): boolean
{
    const cronMonthValue = Number(cronMonthToken) - 1;
    const previousExecutionMonth = previousExecutionTime.getMonth();
    if (cronMonthToken !== "*" && previousExecutionMonth !== cronMonthValue)
    {
        if (previousExecutionMonth < cronMonthValue)
        {
            previousExecutionTime.setFullYear(previousExecutionTime.getFullYear() - 1, 11, 1);
        }
        else
        {
            previousExecutionTime.setMonth(previousExecutionTime.getMonth() - 1, 1);
        }

        previousExecutionTime.setMonth(previousExecutionTime.getMonth() + 1, 0);
        previousExecutionTime.setHours(23, 59, 59);
        return true;
    }

    return false;
}

function tryParseCronDateTokenBackward(cronDateToken: string, previousExecutionTime: Date): boolean
{
    const cronDateValue = Number(cronDateToken);
    const previousExecutionDate = previousExecutionTime.getDate();
    if (cronDateToken !== "*" && cronDateToken !== "?" && previousExecutionDate !== cronDateValue)
    {
        if (previousExecutionDate < cronDateValue)
        {
            previousExecutionTime.setMonth(previousExecutionTime.getMonth() - 1, 1);
            previousExecutionTime.setMonth(previousExecutionTime.getMonth() + 1, 0);
        }
        else
        {
            previousExecutionTime.setDate(previousExecutionDate - 1);
        }

        previousExecutionTime.setHours(23, 59, 59);
        return true;
    }

    return false;
}

function tryParseCronDayTokenBackward(cronDayToken: string, previousExecutionTime: Date): boolean
{
    const cronDayValues = cronDayToken.split(",").map(Number);
    const previousExecutionDay = previousExecutionTime.getDay() + 1;
    if (cronDayToken !== "*" && cronDayToken !== "?" && !cronDayValues.includes(previousExecutionDay))
    {
        if (previousExecutionDay !== 1 && !cronDayValues.includes(1) && previousExecutionDay < Math.min(...cronDayValues))
        {
            previousExecutionTime.setDate(previousExecutionTime.getDate() - previousExecutionDay + 1);
        }
        else
        {
            previousExecutionTime.setDate(previousExecutionTime.getDate() - 1);
        }

        previousExecutionTime.setHours(23, 59, 59);
        return true;
    }

    return false;
}

function tryParseCronHourTokenBackward(cronHourToken: string, previousExecutionTime: Date): boolean
{
    const cronHourValue = Number(cronHourToken);
    const previousExecutionHour = previousExecutionTime.getHours();
    if (cronHourToken !== "*" && previousExecutionHour !== cronHourValue)
    {
        if (previousExecutionHour < cronHourValue)
        {
            previousExecutionTime.setDate(previousExecutionTime.getDate() - 1);
            previousExecutionTime.setHours(23);
        }
        else
        {
            previousExecutionTime.setHours(previousExecutionHour - 1);
        }

        previousExecutionTime.setMinutes(59);
        previousExecutionTime.setSeconds(59);
        return true;
    }

    return false;
}

function tryParseCronMinuteTokenBackward(cronMinuteToken: string, previousExecutionTime: Date): boolean
{
    const cronMinuteValue = Number(cronMinuteToken);
    const previousExecutionMinute = previousExecutionTime.getMinutes();
    if (cronMinuteToken !== "*" && previousExecutionMinute !== cronMinuteValue)
    {
        if (previousExecutionMinute < cronMinuteValue)
        {
            previousExecutionTime.setHours(previousExecutionTime.getHours() - 1);
            previousExecutionTime.setMinutes(59);
        }
        else
        {
            previousExecutionTime.setMinutes(previousExecutionMinute - 1);
        }

        previousExecutionTime.setSeconds(59);
        return true;
    }

    return false;
}

function tryParseCronSecondTokenBackward(cronSecondToken: string, previousExecutionTime: Date): boolean
{
    const cronSecondValue = Number(cronSecondToken);
    const previousExecutionSecond = previousExecutionTime.getSeconds();
    if (cronSecondToken !== "*" && previousExecutionSecond !== cronSecondValue)
    {
        if (previousExecutionSecond < cronSecondValue)
        {
            previousExecutionTime.setMinutes(previousExecutionTime.getMinutes() - 1);
            previousExecutionTime.setSeconds(59);
        }
        else
        {
            previousExecutionTime.setSeconds(previousExecutionSecond - 1);
        }

        return true;
    }

    return false;
}

export function getTimeDurationInDays(startDate: Date, endDate: Date): number
{
    const millisecondCountInDay = 86400000;
    const clonedStartDate = new Date(startDate);
    const clonedEndDate = new Date(endDate);
    clonedStartDate.setHours(0, 0, 0, 0);
    clonedEndDate.setHours(0, 0, 0, 0);

    return (clonedEndDate.getTime() - clonedStartDate.getTime()) / millisecondCountInDay;
}

export function getNextExecutionTime(recurrencePattern: string): Date | undefined
{
    if (!isValidRecurrencePattern(recurrencePattern))
    {
        return undefined;
    }

    const nextExecutionTime = new Date();
    nextExecutionTime.setSeconds(nextExecutionTime.getSeconds() + 1);
    if (tryParseExactTime(recurrencePattern, nextExecutionTime))
    {
        return nextExecutionTime;
    }

    const [cronSecondToken, cronMinuteToken, cronHourToken, cronDateToken, cronMonthToken, , cronYearToken] = recurrencePattern.split(" ");
    while (true)
    {
        if (tryParseCronYearToken(cronYearToken, nextExecutionTime)) continue;
        if (tryParseCronMonthToken(cronMonthToken, nextExecutionTime)) continue;
        if (tryParseCronDateToken(cronDateToken, nextExecutionTime)) continue;
        if (tryParseCronHourToken(cronHourToken, nextExecutionTime)) continue;
        if (tryParseCronMinuteToken(cronMinuteToken, nextExecutionTime)) continue;
        if (tryParseCronSecondToken(cronSecondToken, nextExecutionTime)) continue;
        break;
    }

    return nextExecutionTime;
}

function isValidRecurrencePattern(recurrencePattern: string): boolean
{
    const recurrencePatternRegex = new RegExp(
        "^(\\*|(\\*\\/)?([1-5]?[0-9])) " +
        "(\\*|([1-5]?[0-9])) " +
        "(\\*|(\\*\\/)?([0-9]|1[0-9]|2[0-3])) " +
        "(\\*|(\\*\\/)?([1-9]|[12][0-9]|3[01])) " +
        "(\\*|(\\*\\/)?([1-9]|1[0-2])) " +
        "\\? " +
        "(\\*|(\\*\\/)?(20[0-9][0-9]))$"
    );

    return recurrencePatternRegex.test(recurrencePattern);
}

function tryParseExactTime(recurrencePattern: string, nextExecutionTime: Date): boolean | undefined
{
    const [cronSecondToken, cronMinuteToken, cronHourToken, cronDateToken, cronMonthToken, , cronYearToken] = recurrencePattern.split(" ");
    if (!recurrencePattern.includes("*"))
    {
        nextExecutionTime.setFullYear(Number(cronYearToken), Number(cronMonthToken) - 1, Number(cronDateToken));
        nextExecutionTime.setHours(Number(cronHourToken), Number(cronMinuteToken), Number(cronSecondToken), 0);
        return true;
    }
}

function tryParseCronYearToken(cronYearToken: string, nextExecutionTime: Date): boolean | undefined
{
    const cronYearValue = Number(cronYearToken);
    const nextExecutionYear = nextExecutionTime.getFullYear();
    if (cronYearToken !== "*" && nextExecutionYear < cronYearValue)
    {
        nextExecutionTime.setFullYear(nextExecutionTime.getFullYear() + 1);
        nextExecutionTime.setMonth(0);
        nextExecutionTime.setDate(1);
        nextExecutionTime.setHours(0);
        nextExecutionTime.setMinutes(0);
        nextExecutionTime.setSeconds(0);
        return true;
    }
}

function tryParseCronMonthToken(cronMonthToken: string, nextExecutionTime: Date): boolean | undefined
{
    const cronMonthValue = Number(cronMonthToken) - 1;
    const nextExecutionMonth = nextExecutionTime.getMonth();
    if (cronMonthToken !== "*" && nextExecutionMonth !== cronMonthValue)
    {
        if (nextExecutionMonth > cronMonthValue)
        {
            nextExecutionTime.setFullYear(nextExecutionTime.getFullYear() + 1);
            nextExecutionTime.setMonth(0);
        }
        else
        {
            nextExecutionTime.setMonth(nextExecutionTime.getMonth() + 1);
        }

        nextExecutionTime.setDate(1);
        nextExecutionTime.setHours(0);
        nextExecutionTime.setMinutes(0);
        nextExecutionTime.setSeconds(0);
        return true;
    }
}

function tryParseCronDateToken(cronDateToken: string, nextExecutionTime: Date): boolean | undefined
{
    const cronDateValue = Number(cronDateToken);
    const nextExecutionDate = nextExecutionTime.getDate();
    if (cronDateToken !== "*" && nextExecutionDate !== cronDateValue)
    {
        if (nextExecutionDate > cronDateValue)
        {
            nextExecutionTime.setMonth(nextExecutionTime.getMonth() + 1);
            nextExecutionTime.setDate(1);
        }
        else
        {
            nextExecutionTime.setDate(nextExecutionDate + 1);
        }

        nextExecutionTime.setHours(0);
        nextExecutionTime.setMinutes(0);
        nextExecutionTime.setSeconds(0);
        return true;
    }
}

function tryParseCronHourToken(cronHourToken: string, nextExecutionTime: Date): boolean | undefined
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
}

function tryParseCronMinuteToken(cronMinuteToken: string, nextExecutionTime: Date): boolean | undefined
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
}

function tryParseCronSecondToken(cronSecondToken: string, nextExecutionTime: Date): boolean | undefined
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
}

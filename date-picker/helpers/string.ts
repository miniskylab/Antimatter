import {GregorianCalendar} from "antimatter/date-time";

export function reformat(dateString: string): string
{
    const dateStringWithoutNonDigitCharacters = removeNonDigitCharacters(dateString);
    if (dateStringWithoutNonDigitCharacters.length > 8)
    {
        return dateString;
    }

    if (!dateStringWithoutNonDigitCharacters)
    {
        return String.EMPTY;
    }

    const dayToken = dateStringWithoutNonDigitCharacters.substring(0, 2);
    const monthToken = dateStringWithoutNonDigitCharacters.substring(2, 4);
    const yearToken = dateStringWithoutNonDigitCharacters.substring(4, 8);

    let reformationResult: string;
    if (yearToken)
    {
        reformationResult = `${dayToken} / ${monthToken} / ${yearToken}`;
    }
    else if (monthToken)
    {
        reformationResult = monthToken.length === 2
            ? `${dayToken} / ${monthToken} / `
            : `${dayToken} / ${monthToken}`;
    }
    else
    {
        reformationResult = dayToken.length === 2
            ? `${dayToken} / `
            : dayToken;
    }

    return reformationResult;
}

export function tryParseDate(dateString: string): Date
{
    const dateStringWithoutNonDigitCharacters = removeNonDigitCharacters(dateString);
    if (dateStringWithoutNonDigitCharacters.length !== 8)
    {
        return undefined;
    }

    const yearToken = dateStringWithoutNonDigitCharacters.substring(4, 8);
    const year = parseInt(yearToken, 10);
    if (!GregorianCalendar.isValidYear(year))
    {
        return undefined;
    }

    const monthToken = dateStringWithoutNonDigitCharacters.substring(2, 4);
    const month = parseInt(monthToken, 10) - 1;
    if (!GregorianCalendar.isValidMonth(month))
    {
        return undefined;
    }

    const dayToken = dateStringWithoutNonDigitCharacters.substring(0, 2);
    const day = parseInt(dayToken, 10);
    if (!GregorianCalendar.isValidDay(day, month, year))
    {
        return undefined;
    }

    return new Date(year, month, day);
}

export function isDigit(anyString: string): boolean
{
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(anyString);
}

export function removeNonDigitCharacters(anyString: string): string
{
    return anyString.replace(/[^0-9]/g, String.EMPTY);
}

import {EMPTY_STRING} from "../../consts";

export function clamp(value: number, min?: number, max?: number): number
{
    if (min !== null && min !== undefined && max !== null && max !== undefined && min > max)
    {
        throw new Error("Invalid arguments: 'min' cannot be greater than 'max'");
    }

    if (value === undefined || value === null || isNaN(value))
    {
        return NaN;
    }

    if (min !== undefined && min !== null && !isNaN(min) && value < min)
    {
        return min;
    }

    if (max !== undefined && max !== null && !isNaN(max) && value > max)
    {
        return max;
    }

    return value;
}

export function round(anyNumber: number, fractionDigitCount: number = 0): number
{
    const coefficient = Math.pow(10, fractionDigitCount);
    return Math.round((anyNumber + Number.EPSILON) * coefficient) / coefficient;
}

export function shorten(anyNumber: number): string
{
    if (anyNumber === undefined || anyNumber === null)
    {
        return EMPTY_STRING;
    }

    const thousandMilestone = 1000;
    const millionMilestone = 1000000;
    const billionMilestone = 1000000000;

    let shortenedValue = Number(anyNumber);
    let postFix = EMPTY_STRING;
    if (Math.abs(shortenedValue) === Infinity)
    {
        postFix = EMPTY_STRING;
    }
    else if (Math.abs(shortenedValue) >= billionMilestone)
    {
        shortenedValue /= billionMilestone;
        postFix = "B";
    }
    else if (Math.abs(shortenedValue) >= millionMilestone)
    {
        shortenedValue /= millionMilestone;
        postFix = "M";
    }
    else if (Math.abs(shortenedValue) >= thousandMilestone)
    {
        shortenedValue /= thousandMilestone;
        postFix = "K";
    }

    return `${shortenedValue.toLocaleString("en-us", {useGrouping: true, maximumFractionDigits: 2})}${postFix}`;
}

export function percentToRadians(percent: number): number
{
    if (percent === undefined || percent === null)
    {
        return NaN;
    }

    const oneRotation = 360;
    const halfRotation = 180;
    const degrees = oneRotation * percent;

    return degrees * (Math.PI / halfRotation);
}

export function ensurePercent(anyNumber: number): number
{
    if (anyNumber === undefined || anyNumber === null)
    {
        return NaN;
    }

    if (anyNumber < 0) return 0;
    if (anyNumber > 1) return 100;

    return anyNumber * 100;
}

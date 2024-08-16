import {EMPTY_STRING} from "../../consts";
import {isNotNullAndUndefined, isNullOrUndefined} from "../type-guard";

export function clamp(value: number | undefined, min?: number, max?: number): number
{
    if (isNotNullAndUndefined(min) && isNotNullAndUndefined(max) && min > max)
    {
        throw new Error("Invalid arguments: 'min' cannot be greater than 'max'");
    }

    if (isNullOrUndefined(value) || Number.isNaN(value))
    {
        return NaN;
    }

    if (isNotNullAndUndefined(min) && !Number.isNaN(min) && value < min)
    {
        return min;
    }

    if (isNotNullAndUndefined(max) && !Number.isNaN(max) && value > max)
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
    if (isNullOrUndefined(anyNumber))
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

export function random(min: number, max: number): number
{
    if (isNullOrUndefined(min) || !Number.isFinite(min))
    {
        throw new Error(`Invalid arguments: 'min' cannot be '${min}'`);
    }

    if (isNullOrUndefined(max) || !Number.isFinite(max))
    {
        throw new Error(`Invalid arguments: 'max' cannot be '${max}'`);
    }

    if (min > max)
    {
        throw new Error("Invalid arguments: 'min' cannot be greater than 'max'");
    }

    return Math.random() * (max - min) + min;
}

export function ensurePercent(anyNumber: number): number
{
    if (isNullOrUndefined(anyNumber))
    {
        return NaN;
    }

    if (anyNumber < 0) return 0;
    if (anyNumber > 1) return 100;

    return anyNumber * 100;
}

export function percentToRadians(percent: number): number
{
    if (isNullOrUndefined(percent))
    {
        return NaN;
    }

    const oneRotation = 360;
    const halfRotation = 180;
    const degrees = oneRotation * percent;

    return degrees * (Math.PI / halfRotation);
}

export function degreesToRadians(degrees: number): number
{
    if (isNullOrUndefined(degrees))
    {
        return NaN;
    }

    const halfRotation = 180;
    return degrees * (Math.PI / halfRotation);
}

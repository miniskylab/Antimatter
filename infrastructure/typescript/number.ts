declare global
{
    interface NumberConstructor
    {
        MIN: number;
        MAX: number;
        ONE_HUNDRED_PERCENT: number;

        round(anyNumber: number, fractionDigits?: number): number;
    }

    interface Number
    {
        shorten(): string;
        clamp(min?: number, max?: number): number;
        double(): number;
        getFractionalDigits(): string;
        percentToRadians(): number;
        ensurePercent(): number;
        halve(): number;
        quarter(): number;
    }
}

Number.MIN = -999999999999999;
Number.MAX = 999999999999999;
Number.ONE_HUNDRED_PERCENT = 100;

Number.round = function (anyNumber: number, fractionDigits?: number): number
{
    const coefficient = Math.pow(10, fractionDigits);
    return Math.round((anyNumber + Number.EPSILON) * coefficient) / coefficient;
};

Number.prototype.shorten = function (this: number): string
{
    if (this === undefined || this === null)
    {
        return String.EMPTY;
    }

    const thousandMilestone = 1000;
    const millionMilestone = 1000000;
    const billionMilestone = 1000000000;

    let shortenedValue = Number(this);
    let postFix = String.EMPTY;
    if (Math.abs(shortenedValue) === Infinity)
    {
        postFix = String.EMPTY;
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
};

Number.prototype.clamp = function (this: number, min?: number, max?: number): number
{
    if (min > max)
    {
        throw new Error("Invalid arguments: [min] cannot be greater than [max]");
    }

    if (this === undefined || this === null || isNaN(this))
    {
        return NaN;
    }

    if (min !== undefined && min !== null && !isNaN(min) && this < min)
    {
        return min;
    }

    if (max !== undefined && max !== null && !isNaN(max) && this > max)
    {
        return max;
    }

    return this;
};

Number.prototype.double = function (this: number): number
{
    if (this === undefined || this === null)
    {
        return NaN;
    }

    return this + this;
};

Number.prototype.getFractionalDigits = function (this: number): string
{
    if (this === undefined || this === null)
    {
        return String.EMPTY;
    }

    const stringValue = this.toString();
    if (stringValue.indexOf(".") < 0)
    {
        return String.EMPTY;
    }

    return stringValue.substr(stringValue.indexOf(".") + 1);
};

Number.prototype.percentToRadians = function (this: number): number
{
    if (this === undefined || this === null)
    {
        return NaN;
    }

    const oneRotation = 360;
    const halfRotation = 180;
    const degrees = oneRotation * this;

    return degrees * (Math.PI / halfRotation);
};

Number.prototype.ensurePercent = function (this: number): number
{
    if (this === undefined || this === null)
    {
        return NaN;
    }

    if (this < 0) return 0;
    if (this > 1) return Number.ONE_HUNDRED_PERCENT;

    return this * Number.ONE_HUNDRED_PERCENT;
};

Number.prototype.halve = function (this: number): number
{
    if (this === undefined || this === null)
    {
        return NaN;
    }

    return this * 0.5;
};

Number.prototype.quarter = function (this: number): number
{
    if (this === undefined || this === null)
    {
        return NaN;
    }

    return this * 0.25;
};

export {};

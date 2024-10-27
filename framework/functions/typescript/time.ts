import {isNullOrUndefined} from "../type-guard";

export function getTimeComponents(secTime: number | undefined): [number?, number?, number?]
{
    if (isNullOrUndefined(secTime) || !Number.isFinite(secTime))
    {
        return [undefined, undefined, undefined];
    }

    let remainder = secTime;

    const hourComponent = Math.floor(remainder / 3600);
    remainder %= 3600;

    const minuteComponent = Math.floor(remainder / 60);
    remainder %= 60;

    const secComponent = remainder;

    return [hourComponent, minuteComponent, secComponent];
}

export function getSecTime(hourComponent?: number, minuteComponent?: number, secComponent?: number): number | undefined
{
    if (hourComponent === Infinity || minuteComponent === Infinity || secComponent === Infinity)
    {
        return Infinity;
    }

    if (hourComponent === -Infinity || minuteComponent === -Infinity || secComponent === -Infinity)
    {
        return -Infinity;
    }

    return Number.isFinite(hourComponent) || Number.isFinite(minuteComponent) || Number.isFinite(secComponent)
        ? (hourComponent || 0) * 3600 + (minuteComponent || 0) * 60 + (secComponent || 0)
        : undefined;
}

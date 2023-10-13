import {getRepresentationString, isNullOrUndefined} from "../typescript";

export * from "./decade";
export * from "./time-unit";
export * from "./date-format";
export * from "./day-of-week";

export function deserializeDate(anySerializedDate: number | string | Date): Date
{
    if (typeof anySerializedDate === "number")
    {
        return new Date(anySerializedDate);
    }
    if (typeof anySerializedDate === "string")
    {
        return new Date(anySerializedDate);
    }
    else if (ofTypeDate(anySerializedDate) || isNullOrUndefined(anySerializedDate))
    {
        return anySerializedDate;
    }
    else
    {
        throw new Error(
            "Invalid arguments: The provided argument is not of type string or Date. " +
            `Received value: ${getRepresentationString(anySerializedDate)}`
        );
    }
}

export function ofTypeDate(anyObject: unknown): boolean
{
    return anyObject instanceof Date && Object.prototype.toString.call(anyObject) === "[object Date]";
}

export function isEqualDate(date1: Date, date2: Date): boolean
{
    if (!date1 && !date2) return true;
    if (!date1 || !date2) return false;

    const clonedDate1 = new Date(date1);
    clonedDate1.setHours(0, 0, 0, 0);
    const clonedDate2 = new Date(date2);
    clonedDate2.setHours(0, 0, 0, 0);

    return clonedDate1.getTime() === clonedDate2.getTime();
}

export function isEqualMonth(date1: Date, date2: Date): boolean
{
    if (!date1 && !date2) return true;
    if (!date1 || !date2) return false;

    const clonedDate1 = new Date(date1);
    clonedDate1.setDate(1);
    clonedDate1.setHours(0, 0, 0, 0);
    const clonedDate2 = new Date(date2);
    clonedDate2.setDate(1);
    clonedDate2.setHours(0, 0, 0, 0);

    return clonedDate1.getTime() === clonedDate2.getTime();
}

export function isEqualYear(date1: Date, date2: Date): boolean
{
    if (!date1 && !date2) return true;
    if (!date1 || !date2) return false;

    const clonedDate1 = new Date(date1);
    clonedDate1.setMonth(0);
    clonedDate1.setDate(1);
    clonedDate1.setHours(0, 0, 0, 0);
    const clonedDate2 = new Date(date2);
    clonedDate2.setMonth(0);
    clonedDate2.setDate(1);
    clonedDate2.setHours(0, 0, 0, 0);

    return clonedDate1.getTime() === clonedDate2.getTime();
}

import {getRepresentationString, isNullOrUndefined} from "./object";

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

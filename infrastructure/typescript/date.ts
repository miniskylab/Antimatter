declare global
{
    interface DateConstructor
    {
        deserialize(date: number | string | Date): Date;
        ofTypeDate(anyObject: unknown): boolean;
    }
}

Date.deserialize = function (anySerializedDate: number | string | Date): Date
{
    if (typeof anySerializedDate === "number")
    {
        return new Date(anySerializedDate);
    }
    if (typeof anySerializedDate === "string")
    {
        return new Date(anySerializedDate);
    }
    else if (Date.ofTypeDate(anySerializedDate) || Object.isNullOrUndefined(anySerializedDate))
    {
        return anySerializedDate;
    }
    else
    {
        throw new Error(
            "Invalid arguments: The provided argument is not of type string or Date. " +
            `Received value: ${Object.toRepresentationString(anySerializedDate)}`
        );
    }
};

Date.ofTypeDate = function (anyObject: unknown): boolean
{
    return anyObject instanceof Date && Object.prototype.toString.call(anyObject) === "[object Date]";
};

export {};

declare global
{
    interface ObjectConstructor
    {
        isEmpty(anyObject: unknown): boolean;
        isNullOrUndefined(anyObject: unknown): boolean;
        toRepresentationString(anyObject: unknown): string;
        isNumericEnum(anyObject: unknown): boolean;
    }
}

Object.isNullOrUndefined = function (anyObject: unknown): boolean
{
    return anyObject === null || anyObject === undefined;
};

Object.isEmpty = function (anyObject: unknown): boolean
{
    return anyObject ? Object.keys(anyObject).length === 0 : false;
};

Object.toRepresentationString = function (anyObject: unknown): string
{
    if (typeof anyObject === "string")
    {
        return `"${anyObject}"`;
    }
    else if (Array.isArray(anyObject))
    {
        return `[${anyObject}]`;
    }
    else if (typeof anyObject === "object")
    {
        return JSON.stringify(anyObject, undefined, 4);
    }

    return `${anyObject}`;
};

Object.isNumericEnum = function (anyObject: Record<string, unknown>): boolean
{
    if (!anyObject)
    {
        return false;
    }

    const stringifiedValues = Object.values(anyObject).map(x => `${x}`);
    for (const key in anyObject)
    {
        if (!anyObject.hasOwnProperty(key))
        {
            continue;
        }

        if (!stringifiedValues.includes(key))
        {
            return false;
        }
    }

    return true;
};

export {};

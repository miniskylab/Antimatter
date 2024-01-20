export function isDefaultJavaScriptError(anything: unknown): boolean
{
    if (!anything || typeof anything !== "object")
    {
        return false;
    }

    const indexableObject = anything as Record<string, unknown>;
    return typeof indexableObject.stack === "string" && typeof indexableObject.message === "string";
}

export function throwIfNullOrUndefined<T>(anything: T): asserts anything is NonNullable<T>
{
    if (anything === null || anything === undefined)
    {
        throw new Error("Unexpected null or undefined value here");
    }
}

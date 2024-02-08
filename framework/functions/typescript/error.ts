import {isNullOrUndefined} from "../type-guard";

export function isDefaultJavaScriptError(anything: unknown): anything is Error
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
    if (isNullOrUndefined(anything))
    {
        throw new Error("Unexpected null or undefined value here");
    }
}

export function toSerializable(anyError: Error | string): object | string
{
    if (typeof anyError === "string")
    {
        return anyError;
    }

    const serializableError = JSON.parse(JSON.stringify(anyError));
    if (isDefaultJavaScriptError(anyError))
    {
        delete serializableError["stack"];
    }

    return serializableError;
}

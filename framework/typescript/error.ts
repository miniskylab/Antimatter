export function isDefaultJavaScriptError(anything: unknown): boolean
{
    if (!anything || typeof anything !== "object")
    {
        return false;
    }

    const indexableObject = anything as Record<string, unknown>;
    return typeof indexableObject.stack === "string" && typeof indexableObject.message === "string";
}

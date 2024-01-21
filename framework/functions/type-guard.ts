export function isNullOrUndefined<T>(anything: T | null | undefined): anything is null | undefined
{
    return anything === null || anything === undefined;
}

export function isNotNullAndUndefined<T>(anything: T | null | undefined): anything is T
{
    return anything !== null && anything !== undefined;
}

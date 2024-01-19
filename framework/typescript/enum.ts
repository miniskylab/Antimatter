import {Enum} from "../predefined";

export function getName(anyEnum: Enum, possibleValue: unknown): string | undefined
{
    return (typeof possibleValue === "string" || typeof possibleValue === "number") && Object.values(anyEnum).includes(possibleValue)
        ? Object.keys(anyEnum).find(key => anyEnum[key] === possibleValue)
        : undefined;
}

export function getNames(anyEnum: Enum): string[]
{
    return Object.keys(anyEnum)
        .filter(x => isNaN(parseInt(x, 10)));
}

export function getValues(anyEnum: Enum): (number | string)[]
{
    return Object.values(anyEnum)
        .filter(x => anyEnum[x] !== undefined ? typeof x === "number" : true);
}

export function getValue<T extends number | string | undefined>(
    anyEnum: Record<string, T & number | string | undefined>,
    possibleKey: string | undefined
): T
{
    return possibleKey !== null && possibleKey !== undefined
        ? anyEnum[possibleKey] as T
        : undefined as T;
}

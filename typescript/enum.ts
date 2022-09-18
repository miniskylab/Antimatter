class _Enum
{
    getName(anyEnum: Record<string, number | string>, possiblyValue: unknown): string
    {
        return (typeof possiblyValue === "string" || typeof possiblyValue === "number") && Object.values(anyEnum).includes(possiblyValue)
            ? Object.keys(anyEnum).find(key => anyEnum[key] === possiblyValue)
            : undefined;
    }

    getNames(anyEnum: Record<string, number | string>): string[]
    {
        return Object.keys(anyEnum)
            .filter(x => isNaN(parseInt(x, 10)));
    }

    getValues(anyEnum: Record<string, number | string>): (number | string)[]
    {
        return Object.values(anyEnum)
            .filter(x => anyEnum[x] !== undefined ? typeof x === "number" : true);
    }

    getValue<T extends number | string>(anyEnum: Record<string, T & number | string>, possiblyKey: string): T
    {
        return anyEnum[possiblyKey] as T;
    }
}

export const Enum = new _Enum();

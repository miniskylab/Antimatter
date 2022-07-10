declare global
{
    interface StringConstructor
    {
        EMPTY: string;
        EMPTY_GUID: string;
    }

    interface String
    {
        format(...replacements: string[]): string;
        splitCamelCase(): string;
    }
}

String.EMPTY = "";
String.EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

String.prototype.format = function (this: string, ...replacements: string[]): string
{
    if (!replacements)
    {
        return this;
    }

    return this.replace(/{(\d+)}/g, function (match: string, index: number): string
    {
        return replacements[index]
            ? replacements[index]
            : match;
    });
};

String.prototype.splitCamelCase = function (this: string): string
{
    return this.replace(/([a-zA-Z])([A-Z][a-z])/g, "$1 $2")
        .replace(/([a-z])([A-Z])/g, "$1 $2");
};

export {};

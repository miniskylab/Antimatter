export const EMPTY_STRING = "";

export function whitespace(length: number)
{
    return " ".repeat(length);
}

export function formatString(anyString: string, ...replacements: string[]): string
{
    if (!replacements)
    {
        return anyString;
    }

    return anyString.replace(/{(\d+)}/g, function (match: string, index: number): string
    {
        return replacements[index]
            ? replacements[index]
            : match;
    });
}

export function splitCamelCase(anyString: string): string
{
    return anyString.replace(/([a-zA-Z])([A-Z][a-z])/g, "$1 $2")
        .replace(/([a-z])([A-Z])/g, "$1 $2");
}

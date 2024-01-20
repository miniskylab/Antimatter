import {EMPTY_STRING} from "../consts";

export function whitespace(length: number)
{
    return " ".repeat(length);
}

export function format(anyString: string, ...replacements: string[]): string
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

export function extractQueryParameter(url: string): Record<string, string>
{
    const queryParameterRegex = new RegExp(/[\\?&]([^\\?&=]+)=([^&=]+)/g);
    if (!queryParameterRegex.test(url))
    {
        throw new Error(`Invalid argument! Expected input URL to contain valid query string but got: ${url}`);
    }

    const queryParameter: Record<string, string> = {};
    const keyValuePairs = url.match(queryParameterRegex);
    keyValuePairs?.forEach(keyValuePair =>
    {
        const [key, value] = keyValuePair
            .replace("?", EMPTY_STRING)
            .replace("&", EMPTY_STRING)
            .split("=");

        queryParameter[key] = value;
    });

    return queryParameter;
}

export function base64UrlEncode(base64String: string): string
{
    if (!base64String)
    {
        return base64String;
    }

    return base64String.replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

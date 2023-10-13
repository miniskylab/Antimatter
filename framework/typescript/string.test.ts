import {EMPTY_STRING} from "../predefined";
import {base64UrlEncode, extractQueryParameter, format, splitCamelCase} from "./string";

describe("how to use [format(...)]", () =>
{
    it("replaces placeholders in given string with given replacements", () =>
    {
        const templateString = "The quick brown {0} jumps over the lazy {1}. The {0} is known by his brush. {2}";
        const resultString = "The quick brown fox jumps over the lazy dog. The fox is known by his brush. {2}";

        expect(format(templateString, "fox", "dog")).toBe(resultString);
    });

    it("does nothing when there are no replacements", () =>
    {
        const emptyArray: string[] = [];
        const templateString = "The quick brown {0} jumps over the lazy {1}. The {0} is known by his brush. {2}";

        expect(format(templateString)).toBe(templateString);
        expect(format(templateString, ...emptyArray)).toBe(templateString);
    });
});

describe("how to use [splitCamelCase(...)]", () =>
{
    it("splits camelCase or PascalCase words into individual words", () =>
    {
        expect(splitCamelCase("text")).toBe("text");
        expect(splitCamelCase("camelCase")).toBe("camel Case");
        expect(splitCamelCase("PascalCase")).toBe("Pascal Case");
        expect(splitCamelCase("antimatterRCPExt")).toBe("antimatter RCP Ext");
    });
});

describe("how to use [extractQueryParameter(...)]", () =>
{
    it("extracts query parameters from given URL", () =>
    {
        [
            "http://www.miniskylab.com",
            "https://www.miniskylab.com",
            "exp://localhost:8081",

            "http://www.miniskylab.com/",
            "https://www.miniskylab.com/",
            "exp://localhost:8081/",
            "miniskylab:///",

            "http://www.miniskylab.com/sub-path",
            "https://www.miniskylab.com/sub-path",
            "exp://localhost:8081/sub-path",
            "miniskylab:///sub-path"
        ].forEach(baseUrl =>
        {
            expect(() => extractQueryParameter(`${baseUrl}`)).toThrow();
            expect(() => extractQueryParameter(`${baseUrl}?`)).toThrow();
            expect(() => extractQueryParameter(`${baseUrl}?key1`)).toThrow();
            expect(() => extractQueryParameter(`${baseUrl}?key1=`)).toThrow();
            expect(extractQueryParameter(`${baseUrl}?key1=value1`)).toEqual({key1: "value1"});
            expect(extractQueryParameter(`${baseUrl}?key1=value1&key2=value2`)).toEqual({key1: "value1", key2: "value2"});
        });
    });
});

describe("how to use [base64UrlEncode(...)]", () =>
{
    it("performs URL-safe encoding on given Base64 string", () =>
    {
        expect(base64UrlEncode(EMPTY_STRING)).toBe(EMPTY_STRING);
        expect(base64UrlEncode(null)).toBe(null);
        expect(base64UrlEncode(undefined)).toBe(undefined);
        expect(base64UrlEncode("TG+/9y0/aX+zdQ==")).toBe("TG-_9y0_aX-zdQ");
    });
});

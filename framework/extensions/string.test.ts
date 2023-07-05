import {formatString, splitCamelCase} from "./string";

describe("how to use [formatString(...)]", () =>
{
    it("replaces placeholders in given string with given replacements", () =>
    {
        const templateString = "The quick brown {0} jumps over the lazy {1}. The {0} is known by his brush. {2}";
        const resultString = "The quick brown fox jumps over the lazy dog. The fox is known by his brush. {2}";

        expect(formatString(templateString, "fox", "dog")).toBe(resultString);
    });

    it("does nothing when there are no replacements", () =>
    {
        const emptyArray: string[] = [];
        const templateString = "The quick brown {0} jumps over the lazy {1}. The {0} is known by his brush. {2}";

        expect(formatString(templateString)).toBe(templateString);
        expect(formatString(templateString, ...emptyArray)).toBe(templateString);
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

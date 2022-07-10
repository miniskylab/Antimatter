describe("how to use string constants", (): void =>
{
    it("returns pre-defined constants", (): void =>
    {
        expect(String.EMPTY).toBe("");
        expect(String.EMPTY_GUID).toBe("00000000-0000-0000-0000-000000000000");
    });
});

describe("how to use [String.format(...)]", (): void =>
{
    it("replaces placeholders in given string with given replacements", (): void =>
    {
        const templateString = "The quick brown {0} jumps over the lazy {1}. The {0} is known by his brush. {2}";
        const resultString = "The quick brown fox jumps over the lazy dog. The fox is known by his brush. {2}";

        expect(templateString.format("fox", "dog")).toBe(resultString);
    });

    it("does nothing when there are no replacements", (): void =>
    {
        const emptyArray: string[] = [];
        const templateString = "The quick brown {0} jumps over the lazy {1}. The {0} is known by his brush. {2}";

        expect(templateString.format()).toBe(templateString);
        expect(templateString.format(...emptyArray)).toBe(templateString);
    });
});

describe("how to use [String.splitCamelCase(...)]", (): void =>
{
    it("splits camelCase or PascalCase words into individual words", (): void =>
    {
        expect("text".splitCamelCase()).toBe("text");
        expect("camelCase".splitCamelCase()).toBe("camel Case");
        expect("PascalCase".splitCamelCase()).toBe("Pascal Case");
        expect("antimatterRCPExt".splitCamelCase()).toBe("antimatter RCP Ext");
    });
});

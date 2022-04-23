describe("how to use [Object.isNullOrUndefined(...)]", (): void =>
{
    it("returns true if the given object is an empty object", (): void =>
    {
        expect(Object.isNullOrUndefined(null)).toBe(true);
        expect(Object.isNullOrUndefined(undefined)).toBe(true);

        const parameters = [-NaN, NaN, -Infinity, Infinity, 0, "string", false, {}, (): void => { /* Does nothing */ }];
        parameters.forEach(value =>
        {
            expect(Object.isNullOrUndefined(value)).toBe(false);
        });
    });
});

describe("how to use [Object.isEmpty(...)]", (): void =>
{
    it("returns true if the given object is an empty object", (): void =>
    {
        expect(Object.isEmpty({})).toBe(true);
        expect(Object.isEmpty({test: "test"})).toBe(false);
    });
});

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

describe("how to use [Object.removeUndefinedProperties(...)]", (): void =>
{
    it("does nothing if the given object is empty", (): void =>
    {
        expect(Object.removeUndefinedProperties({})).toEqual({});
    });

    it("removes all properties whose value is undefined from the given object", (): void =>
    {
        expect(
            Object.removeUndefinedProperties({
                property1: "string",
                property2: undefined,
                property3: 0,
                property4: false,
                property5: null,
                property6: undefined,
                property7: {
                    property1: "string",
                    property2: undefined,
                    property3: 0,
                    property4: false,
                    property5: null
                }
            })
        ).toEqual(
            {
                property1: "string",
                property3: 0,
                property4: false,
                property5: null,
                property7: {
                    property1: "string",
                    property2: undefined,
                    property3: 0,
                    property4: false,
                    property5: null
                }
            }
        );
    });
});

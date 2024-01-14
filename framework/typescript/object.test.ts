import {isDefaultJavaScriptError, isEmpty, isNullOrUndefined} from "./object";

describe("how to use [isNullOrUndefined(...)]", () =>
{
    it("returns true if the given object is an empty object", () =>
    {
        expect(isNullOrUndefined(null)).toBe(true);
        expect(isNullOrUndefined(undefined)).toBe(true);

        const parameters = [-NaN, NaN, -Infinity, Infinity, 0, "string", false, {}, () => { /* Does nothing */ }];
        parameters.forEach(value =>
        {
            expect(isNullOrUndefined(value)).toBe(false);
        });
    });
});

describe("how to use [isEmpty(...)]", () =>
{
    it("returns true if the given object is an empty object", () =>
    {
        expect(isEmpty({})).toBe(true);
        expect(isEmpty({test: "test"})).toBe(false);
    });
});

describe("how to use [isDefaultJavaScriptError(...)]", () =>
{
    it("returns true if the given object is default javascript error object", () =>
    {
        [
            undefined,
            null,
            "This is an error message"
        ].forEach(message =>
        {
            try
            {
                throwError(message);
            }
            catch (error)
            {
                expect(isDefaultJavaScriptError(error)).toBe(true);
            }
        });

        expect(isDefaultJavaScriptError(new Error())).toBe(true);
        expect(isDefaultJavaScriptError(new Error("This is an error message"))).toBe(true);
        expect(isDefaultJavaScriptError({})).toBe(false);

        function throwError(message?: string) { throw new Error(message); }
    });
});

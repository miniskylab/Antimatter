import {isDefaultJavaScriptErrorObject, isEmptyObject, isNullOrUndefined} from "./object";

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

describe("how to use [isEmptyObject(...)]", () =>
{
    it("returns true if the given object is an empty object", () =>
    {
        expect(isEmptyObject({})).toBe(true);
        expect(isEmptyObject({test: "test"})).toBe(false);
    });
});

describe("how to use [isDefaultJavaScriptErrorObject(...)]", () =>
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
                expect(isDefaultJavaScriptErrorObject(error)).toBe(true);
            }
        });

        expect(isDefaultJavaScriptErrorObject(new Error())).toBe(true);
        expect(isDefaultJavaScriptErrorObject(new Error("This is an error message"))).toBe(true);
        expect(isDefaultJavaScriptErrorObject({})).toBe(false);

        function throwError(message?: string) { throw Error(message); }
    });
});

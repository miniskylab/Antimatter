import {isDefaultJavaScriptError, throwIfNullOrUndefined} from "./error";

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
                function throwError(message?: string | null) { throw new Error(message ?? ""); }
            }
            catch (error)
            {
                expect(isDefaultJavaScriptError(error)).toBe(true);
            }
        });

        expect(isDefaultJavaScriptError(new Error())).toBe(true);
        expect(isDefaultJavaScriptError(new Error("This is an error message"))).toBe(true);
        expect(isDefaultJavaScriptError({})).toBe(false);
    });
});

describe("how to use [throwIfNullOrUndefined(...)]", () =>
{
    it("throws an error if the given value is null or undefined", () =>
    {
        expect(() => throwIfNullOrUndefined(null)).toThrow();
        expect(() => throwIfNullOrUndefined(undefined)).toThrow();

        expect(() => throwIfNullOrUndefined(0)).not.toThrow();
        expect(() => throwIfNullOrUndefined("")).not.toThrow();
        expect(() => throwIfNullOrUndefined({})).not.toThrow();
        expect(() => throwIfNullOrUndefined([])).not.toThrow();
    });
});

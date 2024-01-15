import {isDefaultJavaScriptError} from "./error";

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
                function throwError(message?: string | null) { throw new Error(message); }
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

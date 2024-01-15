import {isNullOrUndefined} from "./data";

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

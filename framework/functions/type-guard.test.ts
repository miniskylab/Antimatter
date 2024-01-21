import {isNotNullAndUndefined, isNullOrUndefined} from "./type-guard";

describe("how to use [isNullOrUndefined(...)]", () =>
{
    it("returns true if the given value is null or undefined", () =>
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

describe("how to use [isNotNullAndUndefined(...)]", () =>
{
    it("returns true if the given value is not null and undefined", () =>
    {
        expect(isNotNullAndUndefined(null)).toBe(false);
        expect(isNotNullAndUndefined(undefined)).toBe(false);

        const parameters = [-NaN, NaN, -Infinity, Infinity, 0, "string", false, {}, () => { /* Does nothing */ }];
        parameters.forEach(value =>
        {
            expect(isNotNullAndUndefined(value)).toBe(true);
        });
    });
});

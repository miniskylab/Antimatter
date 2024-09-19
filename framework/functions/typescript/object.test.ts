import {isEmpty} from "./object";

describe("how to use 'isEmpty(...)'", () =>
{
    it("returns true if the given object is an empty object", () =>
    {
        expect(isEmpty({})).toBe(true);
        expect(isEmpty({test: "test"})).toBe(false);
    });
});

import {clamp, degreesToRadians, ensurePercent, percentToRadians, shorten} from "./number";

describe("how to use [clamp(...)]", () =>
{
    it("throws error when 1st argument is greater than 2nd argument", () =>
    {
        const values = [-Infinity, Infinity, -10, 0, 10];
        values.forEach(value =>
        {
            const min = 1;
            const max = -1;

            expect(() => { clamp(value, min, max); }).toThrow(Error);
            expect(() => { clamp(value, min, max); }).toThrow("Invalid arguments: 'min' cannot be greater than 'max'");
        });
    });

    it("returns NaN when being used on NaN", () =>
    {
        expect(clamp(NaN)).toBe(NaN);
        expect(clamp(-NaN)).toBe(-NaN);

        const parameters = [undefined, null, -NaN, NaN, -Infinity, Infinity, -1, 0, 5];
        parameters.forEach(min =>
        {
            expect(clamp(NaN, min)).toBe(NaN);
            expect(clamp(-NaN, min)).toBe(-NaN);

            parameters.forEach(max =>
            {
                if (min > max)
                {
                    return;
                }

                expect(clamp(NaN, min, max)).toBe(NaN);
                expect(clamp(-NaN, min, max)).toBe(-NaN);
            });
        });
    });

    it("can be used with Infinity", () =>
    {
        const parameters = [-Infinity, Infinity, -10, 0, 10];
        parameters.forEach(value =>
        {
            expect(clamp(Infinity, value)).toBe(Infinity);
            expect(clamp(-Infinity, value)).toBe(value);

            expect(clamp(value, -Infinity)).toBe(value);
            expect(clamp(value, Infinity)).toBe(Infinity);

            parameters.forEach(min =>
            {
                parameters.forEach(max =>
                {
                    if (min > max)
                    {
                        return;
                    }

                    expect(clamp(Infinity, min, max)).toBe(max);
                    expect(clamp(-Infinity, min, max)).toBe(min);
                });

                expect(clamp(value, min, Infinity)).toBe(Math.max(value, min));
            });

            parameters.forEach(max =>
            {
                expect(clamp(value, -Infinity, max)).toBe(Math.min(value, max));
            });
        });
    });

    it("does nothing when both arguments are not number", () =>
    {
        const value = 100;
        expect(clamp(value)).toBe(value);

        const paramaters = [undefined, null, NaN, -NaN];
        paramaters.forEach(min =>
        {
            paramaters.forEach(max =>
            {
                expect(clamp(value, min, max)).toBe(value);
            });
        });
    });

    it("treats 2nd argument as -Infinity if it is not a number", () =>
    {
        const paramaters = [undefined, null, NaN, -NaN];
        paramaters.forEach(min =>
        {
            const max = 2;

            let value = 4;
            expect(clamp(value, min, max)).toBe(clamp(value, -Infinity, max));
            expect(clamp(value, min, max)).toBe(max);

            value = -4;
            expect(clamp(value, min, max)).toBe(clamp(value, -Infinity, max));
            expect(clamp(value, min, max)).toBe(value);
        });
    });

    it("treats 3rd argument as Infinity if it is not a number", () =>
    {
        const min = -1;

        let value = 5;
        expect(clamp(value, min)).toBe(clamp(value, min, Infinity));
        expect(clamp(value, min)).toBe(value);

        value = -5;
        expect(clamp(value, min)).toBe(clamp(value, min, Infinity));
        expect(clamp(value, min)).toBe(min);

        const paramaters = [undefined, null, NaN, -NaN];
        paramaters.forEach(max =>
        {
            value = 5;
            expect(clamp(value, min, max)).toBe(clamp(value, min, Infinity));
            expect(clamp(value, min, max)).toBe(value);

            value = -5;
            expect(clamp(value, min, max)).toBe(clamp(value, min, Infinity));
            expect(clamp(value, min, max)).toBe(min);
        });
    });

    it("clamps between 2nd and 3rd arguments", () =>
    {
        expect(clamp(0, -1, 1)).toBe(0);
        expect(clamp(-2, -1, 1)).toBe(-1);
        expect(clamp(2, -1, 1)).toBe(1);
        expect(clamp(5, 0, 0)).toBe(0);
    });
});

describe("how to use [shorten(...)]", () =>
{
    it("returns the shortened version of the given number in string", () =>
    {
        const testCases = [
            {input: NaN, expectedResult: "NaN"},
            {input: -NaN, expectedResult: "NaN"},
            {input: Infinity, expectedResult: "∞"},
            {input: -Infinity, expectedResult: "-∞"},
            {input: -1234567890, expectedResult: "-1.23B"},
            {input: -1000000000, expectedResult: "-1B"},
            {input: -1453670, expectedResult: "-1.45M"},
            {input: -1000000, expectedResult: "-1M"},
            {input: -1250, expectedResult: "-1.25K"},
            {input: -1000, expectedResult: "-1K"},
            {input: -125, expectedResult: "-125"},
            {input: 0, expectedResult: "0"},
            {input: 125, expectedResult: "125"},
            {input: 1000, expectedResult: "1K"},
            {input: 1250, expectedResult: "1.25K"},
            {input: 1000000, expectedResult: "1M"},
            {input: 1453670, expectedResult: "1.45M"},
            {input: 1000000000, expectedResult: "1B"},
            {input: 1234567890, expectedResult: "1.23B"}
        ];
        testCases.forEach(x => { expect(shorten(x.input)).toBe(x.expectedResult); });
    });
});

describe("how to use [ensurePercent(...)]", () =>
{
    it("returns a value between 0 and 100 (percent)", () =>
    {
        const testCases = [
            {input: NaN, expectedResult: NaN},
            {input: -NaN, expectedResult: NaN},
            {input: Infinity, expectedResult: 100},
            {input: -Infinity, expectedResult: 0},
            {input: -1, expectedResult: 0},
            {input: 0, expectedResult: 0},
            {input: 0.6, expectedResult: 60},
            {input: 1, expectedResult: 100},
            {input: 12, expectedResult: 100}
        ];
        testCases.forEach(x => { expect(ensurePercent(x.input)).toBe(x.expectedResult); });
    });
});

describe("how to use [percentToRadians(...)]", () =>
{
    it("returns radians of given percentage (100% = 360 degrees)", () =>
    {
        const testCases = [
            {input: NaN, expectedResult: NaN},
            {input: -NaN, expectedResult: NaN},
            {input: Infinity, expectedResult: Infinity},
            {input: -Infinity, expectedResult: -Infinity},
            {input: -5, expectedResult: -5 * 2 * Math.PI},
            {input: -1, expectedResult: Math.PI * -2},
            {input: -0.5, expectedResult: -Math.PI},
            {input: 0, expectedResult: 0},
            {input: 0.5, expectedResult: Math.PI},
            {input: 1, expectedResult: Math.PI * 2},
            {input: 5, expectedResult: 5 * 2 * Math.PI}
        ];
        testCases.forEach(x => { expect(percentToRadians(x.input)).toBe(x.expectedResult); });
    });
});

describe("how to use [degreesToRadians(...)]", () =>
{
    it("returns radians of given degrees", () =>
    {
        const testCases = [
            {input: NaN, expectedResult: NaN},
            {input: -NaN, expectedResult: NaN},
            {input: Infinity, expectedResult: Infinity},
            {input: -Infinity, expectedResult: -Infinity},
            {input: 0, expectedResult: 0},
            {input: 90, expectedResult: Math.PI / 2},
            {input: 180, expectedResult: Math.PI},
            {input: 360, expectedResult: 2 * Math.PI}
        ];
        testCases.forEach(x => { expect(degreesToRadians(x.input)).toBe(x.expectedResult); });
    });
});

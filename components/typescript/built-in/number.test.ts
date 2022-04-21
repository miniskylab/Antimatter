describe("how to use [Number.halve(...)]", (): void =>
{
    it("halves the given number", (): void =>
    {
        expect(NaN.halve()).toBe(NaN);
        expect((-NaN).halve()).toBe(-NaN);

        expect(Infinity.halve()).toBe(Infinity);
        expect((-Infinity).halve()).toBe(-Infinity);

        expect((-10).halve()).toBe(-5);
        expect((0).halve()).toBe(0);
        expect((10).halve()).toBe(5);

        expect(0.5.halve()).toBeCloseTo(0.25);
    });
});

describe("how to use [Number.double(...)]", (): void =>
{
    it("doubles the given number", (): void =>
    {
        expect(NaN.double()).toBe(NaN);
        expect((-NaN).double()).toBe(-NaN);

        expect(Infinity.double()).toBe(Infinity);
        expect((-Infinity).double()).toBe(-Infinity);

        expect((-2).double()).toBe(-4);
        expect((0).double()).toBe(0);
        expect((2).double()).toBe(4);

        expect(0.25.double()).toBeCloseTo(0.5);
    });
});

describe("how to use [Number.quarter(...)]", (): void =>
{
    it("quarters the given number", (): void =>
    {
        expect(NaN.quarter()).toBe(NaN);
        expect((-NaN).quarter()).toBe(-NaN);

        expect(Infinity.quarter()).toBe(Infinity);
        expect((-Infinity).quarter()).toBe(-Infinity);

        expect((-8).quarter()).toBe(-2);
        expect((0).quarter()).toBe(0);
        expect((8).quarter()).toBe(2);

        expect((0.8).quarter()).toBeCloseTo(0.2);
    });
});

describe("how to use [Number.clamp(...)]", (): void =>
{
    it("throws error when 1st argument is greater than 2nd argument", (): void =>
    {
        const values = [-Infinity, Infinity, -10, 0, 10];
        values.forEach(x =>
        {
            const min = 1;
            const max = -1;

            expect(() => { x.clamp(min, max); }).toThrow(Error);
            expect(() => { x.clamp(min, max); }).toThrow("Invalid arguments: [min] cannot be greater than [max]");
        });
    });

    it("returns NaN when being used on NaN", (): void =>
    {
        expect(NaN.clamp()).toBe(NaN);
        expect((-NaN).clamp()).toBe(-NaN);

        const parameters = [undefined, null, -NaN, NaN, -Infinity, Infinity, -1, 0, 5];
        parameters.forEach(min =>
        {
            expect(NaN.clamp(min)).toBe(NaN);
            expect((-NaN).clamp(min)).toBe(-NaN);

            parameters.forEach(max =>
            {
                if (min > max)
                {
                    return;
                }

                expect(NaN.clamp(min, max)).toBe(NaN);
                expect((-NaN).clamp(min, max)).toBe(-NaN);
            });
        });
    });

    it("can be used with Infinity", (): void =>
    {
        const parameters = [-Infinity, Infinity, -10, 0, 10];
        parameters.forEach(value =>
        {
            expect(Infinity.clamp(value)).toBe(Infinity);
            expect((-Infinity).clamp(value)).toBe(value);

            expect(value.clamp(-Infinity)).toBe(value);
            expect(value.clamp(Infinity)).toBe(Infinity);

            parameters.forEach(min =>
            {
                parameters.forEach(max =>
                {
                    if (min > max)
                    {
                        return;
                    }

                    expect(Infinity.clamp(min, max)).toBe(max);
                    expect((-Infinity).clamp(min, max)).toBe(min);
                });

                expect((value).clamp(min, Infinity)).toBe(Math.max(value, min));
            });

            parameters.forEach(max =>
            {
                expect(value.clamp(-Infinity, max)).toBe(Math.min(value, max));
            });
        });
    });

    it("does nothing when both arguments are not number", (): void =>
    {
        const value = 100;
        expect(value.clamp()).toBe(value);

        const paramaters = [undefined, null, NaN, -NaN];
        paramaters.forEach(min =>
        {
            paramaters.forEach(max =>
            {
                expect(value.clamp(min, max)).toBe(value);
            });
        });
    });

    it("treats 1st argument as -Infinity if it is not a number", (): void =>
    {
        const paramaters = [undefined, null, NaN, -NaN];
        paramaters.forEach(min =>
        {
            const max = 2;

            let value = 4;
            expect(value.clamp(min, max)).toBe(value.clamp(-Infinity, max));
            expect(value.clamp(min, max)).toBe(max);

            value = -4;
            expect(value.clamp(min, max)).toBe(value.clamp(-Infinity, max));
            expect(value.clamp(min, max)).toBe(value);
        });
    });

    it("treats 2nd argument as Infinity if it is not a number", (): void =>
    {
        const min = -1;

        let value = 5;
        expect(value.clamp(min)).toBe(value.clamp(min, Infinity));
        expect(value.clamp(min)).toBe(value);

        value = -5;
        expect(value.clamp(min)).toBe(value.clamp(min, Infinity));
        expect(value.clamp(min)).toBe(min);

        const paramaters = [undefined, null, NaN, -NaN];
        paramaters.forEach(max =>
        {
            value = 5;
            expect(value.clamp(min, max)).toBe(value.clamp(min, Infinity));
            expect(value.clamp(min, max)).toBe(value);

            value = -5;
            expect(value.clamp(min, max)).toBe(value.clamp(min, Infinity));
            expect(value.clamp(min, max)).toBe(min);
        });
    });

    it("clamps between 1st and 2nd arguments", (): void =>
    {
        expect((0).clamp(-1, 1)).toBe(0);
        expect((-2).clamp(-1, 1)).toBe(-1);
        expect((2).clamp(-1, 1)).toBe(1);
        expect((5).clamp(0, 0)).toBe(0);
    });
});

describe("how to use [Number.shorten(...)]", (): void =>
{
    it("returns the shortened version of the given number in string", (): void =>
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
        testCases.forEach(x => { expect(x.input.shorten()).toBe(x.expectedResult); });
    });
});

describe("how to use [Number.ensurePercent(...)]", (): void =>
{
    it("returns a value between 0 and 100 (percent)", (): void =>
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
        testCases.forEach(x => { expect(x.input.ensurePercent()).toBe(x.expectedResult); });
    });
});

describe("how to use [Number.percentToRadians(...)]", (): void =>
{
    it("returns radians of given percentage (100% = 360 degrees)", (): void =>
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
        testCases.forEach(x => { expect(x.input.percentToRadians()).toBe(x.expectedResult); });
    });
});

describe("how to use [Number.getFractionalDigits(...)]", (): void =>
{
    it("returns fractional digits of the given number", (): void =>
    {
        const testCases = [
            {input: NaN, expectedResult: String.EMPTY},
            {input: -NaN, expectedResult: String.EMPTY},
            {input: Infinity, expectedResult: String.EMPTY},
            {input: -Infinity, expectedResult: String.EMPTY},
            {input: 0, expectedResult: String.EMPTY},
            {input: -1, expectedResult: String.EMPTY},
            {input: 0.0125, expectedResult: "0125"},
            {input: -0.0125, expectedResult: "0125"}
        ];
        testCases.forEach(x => { expect(x.input.getFractionalDigits()).toBe(x.expectedResult); });
    });
});

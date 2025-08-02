import {getSecTime, getTimeComponents} from "./time";

describe("how to use 'getTimeComponents(...)'", () =>
{
    it("converts input seconds into hours, minutes and seconds", () =>
    {
        expect(getTimeComponents(NaN)).toEqual([undefined, undefined, undefined]);
        expect(getTimeComponents(-NaN)).toEqual([undefined, undefined, undefined]);
        expect(getTimeComponents(Infinity)).toEqual([undefined, undefined, undefined]);
        expect(getTimeComponents(-Infinity)).toEqual([undefined, undefined, undefined]);
        expect(getTimeComponents(undefined)).toEqual([undefined, undefined, undefined]);
        expect(getTimeComponents(null!)).toEqual([undefined, undefined, undefined]);
        expect(getTimeComponents(0)).toEqual([0, 0, 0]);
        expect(getTimeComponents(30)).toEqual([0, 0, 30]);
        expect(getTimeComponents(60)).toEqual([0, 1, 0]);
        expect(getTimeComponents(90)).toEqual([0, 1, 30]);
        expect(getTimeComponents(3600)).toEqual([1, 0, 0]);
        expect(getTimeComponents(3630)).toEqual([1, 0, 30]);
        expect(getTimeComponents(5400)).toEqual([1, 30, 0]);
        expect(getTimeComponents(5415)).toEqual([1, 30, 15]);
    });
});

describe("how to use 'getSecTime(...)'", () =>
{
    it("converts input hours, minutes and seconds into seconds", () =>
    {
        const nonFiniteNumbers = [undefined, null, NaN, -NaN];
        nonFiniteNumbers.forEach((hourComponent: number) =>
        {
            nonFiniteNumbers.forEach((minuteComponent: number) =>
            {
                nonFiniteNumbers.forEach((secComponent: number) =>
                {
                    expect(getSecTime(hourComponent, minuteComponent, secComponent)).toBeUndefined();
                });
            });
        });

        [Infinity, -Infinity].forEach(x =>
        {
            expect(getSecTime(x, 0, 0)).toBe(x);
            expect(getSecTime(0, x, 0)).toBe(x);
            expect(getSecTime(0, 0, x)).toBe(x);

            expect(getSecTime(x, 1, 1)).toBe(x);
            expect(getSecTime(1, x, 1)).toBe(x);
            expect(getSecTime(1, 1, x)).toBe(x);

            expect(getSecTime(x, x, x)).toBe(x);
        });

        expect(getSecTime(0, 0, 0)).toBe(0);
        expect(getSecTime(0, 0, 30)).toBe(30);
        expect(getSecTime(0, 1, 0)).toBe(60);
        expect(getSecTime(0, 1, 30)).toBe(90);
        expect(getSecTime(1, 0, 0)).toBe(3600);
        expect(getSecTime(1, 0, 30)).toBe(3630);
        expect(getSecTime(1, 30, 0)).toBe(5400);
        expect(getSecTime(1, 30, 15)).toBe(5415);
    });

    it("treats non-numeric values as 0", () =>
    {
        const nonNumericValues = [undefined, null, NaN, -NaN];
        nonNumericValues.forEach((nonNumericValue: number) =>
        {
            expect(getSecTime(1, 30, nonNumericValue)).toBe(5400);
            expect(getSecTime(1, nonNumericValue, 30)).toBe(3630);
            expect(getSecTime(nonNumericValue, 1, 30)).toBe(90);
        });
    });
});

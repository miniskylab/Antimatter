import {LunarCalendarVn} from "./lunar-calendar-vn";

describe("how to use 'LunarCalendarVn.getLunarDate(...)'", () =>
{
    it("returns lunar date for given gregorian date", () =>
    {
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 1, 16))).toEqual({year: 2018, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 2, 17))).toEqual({year: 2018, month: 2, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 3, 16))).toEqual({year: 2018, month: 3, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 4, 15))).toEqual({year: 2018, month: 4, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 5, 14))).toEqual({year: 2018, month: 5, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 6, 13))).toEqual({year: 2018, month: 6, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 7, 11))).toEqual({year: 2018, month: 7, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 8, 10))).toEqual({year: 2018, month: 8, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 9, 9))).toEqual({year: 2018, month: 9, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 10, 7))).toEqual({year: 2018, month: 10, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 11, 7))).toEqual({year: 2018, month: 11, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2019, 0, 6))).toEqual({year: 2018, month: 12, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2019, 2, 6))).toEqual({year: 2019, month: 2, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2019, 1, 5))).toEqual({year: 2019, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2020, 0, 25))).toEqual({year: 2020, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2021, 1, 12))).toEqual({year: 2021, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2022, 1, 1))).toEqual({year: 2022, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2023, 0, 22))).toEqual({year: 2023, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2024, 1, 10))).toEqual({year: 2024, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2025, 0, 29))).toEqual({year: 2025, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2026, 1, 17))).toEqual({year: 2026, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2027, 1, 6))).toEqual({year: 2027, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2028, 0, 26))).toEqual({year: 2028, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2029, 1, 13))).toEqual({year: 2029, month: 1, day: 1, isLeapMonth: false});
        expect(LunarCalendarVn.getLunarDate(new Date(2030, 1, 2))).toEqual({year: 2030, month: 1, day: 1, isLeapMonth: false});
    });
});

describe("how to use 'LunarCalendarVn.getGregorianDate(...)'", () =>
{
    it("returns gregorian date for given lunar date", () =>
    {
        expect(LunarCalendarVn.getGregorianDate({year: 2018, month: 1, day: 30, isLeapMonth: false})).toBe(null);
        expect(LunarCalendarVn.getGregorianDate({year: 2003, month: 0, day: 1, isLeapMonth: false})).toBe(null);
        expect(LunarCalendarVn.getGregorianDate({year: 2003, month: 2, day: 1, isLeapMonth: true})).toBe(null);
        expect(LunarCalendarVn.getGregorianDate({year: 2003, month: 13, day: 1, isLeapMonth: false})).toBe(null);

        expect(LunarCalendarVn.getGregorianDate({year: 2004, month: 2, day: 1, isLeapMonth: true})?.getTime())
            .toBe(new Date(2004, 2, 21).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2004, month: 2, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2004, 1, 20).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2004, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2004, 0, 22).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2005, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2005, 1, 9).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2006, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2006, 0, 29).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2018, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2018, 1, 16).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2019, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2019, 1, 5).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2020, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2020, 0, 25).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2021, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2021, 1, 12).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2022, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2022, 1, 1).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2023, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2023, 0, 22).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2024, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2024, 1, 10).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2025, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2025, 0, 29).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2026, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2026, 1, 17).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2027, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2027, 1, 6).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2028, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2028, 0, 26).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2029, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2029, 1, 13).getTime());

        expect(LunarCalendarVn.getGregorianDate({year: 2030, month: 1, day: 1, isLeapMonth: false})?.getTime())
            .toBe(new Date(2030, 1, 2).getTime());
    });
});

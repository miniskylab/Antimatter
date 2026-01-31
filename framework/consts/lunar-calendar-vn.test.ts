import {LunarCalendarVn} from "./lunar-calendar-vn";

describe("how to use 'LunarCalendarVn.getJulianDayCount(...)'", () =>
{
    it("returns Julian Day count for given Date object", () =>
    {
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 1, 16))).toEqual([2018, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 2, 17))).toEqual([2018, 2, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 3, 16))).toEqual([2018, 3, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 4, 15))).toEqual([2018, 4, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 5, 14))).toEqual([2018, 5, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 6, 13))).toEqual([2018, 6, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 7, 11))).toEqual([2018, 7, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 8, 10))).toEqual([2018, 8, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 9, 9))).toEqual([2018, 9, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 10, 7))).toEqual([2018, 10, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2018, 11, 7))).toEqual([2018, 11, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2019, 0, 6))).toEqual([2018, 12, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2019, 2, 6))).toEqual([2019, 2, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2019, 1, 5))).toEqual([2019, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2020, 0, 25))).toEqual([2020, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2021, 1, 12))).toEqual([2021, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2022, 1, 1))).toEqual([2022, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2023, 0, 22))).toEqual([2023, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2024, 1, 10))).toEqual([2024, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2025, 0, 29))).toEqual([2025, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2026, 1, 17))).toEqual([2026, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2027, 1, 6))).toEqual([2027, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2028, 0, 26))).toEqual([2028, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2029, 1, 13))).toEqual([2029, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2030, 1, 2))).toEqual([2030, 1, 1, 0]);

        expect(LunarCalendarVn.getGregorianDate(2018, 1, 30)).toBe(null);
        expect(LunarCalendarVn.getGregorianDate(2003, 0, 1)).toBe(null);
        expect(LunarCalendarVn.getGregorianDate(2003, 2, 1, true)).toBe(null);
        expect(LunarCalendarVn.getGregorianDate(2003, 13, 1)).toBe(null);
        expect(LunarCalendarVn.getGregorianDate(2004, 2, 1, true)?.getTime()).toBe(new Date(2004, 2, 21).getTime());
        expect(LunarCalendarVn.getGregorianDate(2004, 2, 1)?.getTime()).toBe(new Date(2004, 1, 20).getTime());
        expect(LunarCalendarVn.getGregorianDate(2004, 1, 1)?.getTime()).toBe(new Date(2004, 0, 22).getTime());
        expect(LunarCalendarVn.getGregorianDate(2005, 1, 1)?.getTime()).toBe(new Date(2005, 1, 9).getTime());
        expect(LunarCalendarVn.getGregorianDate(2006, 1, 1)?.getTime()).toBe(new Date(2006, 0, 29).getTime());
        expect(LunarCalendarVn.getGregorianDate(2018, 1, 1)?.getTime()).toBe(new Date(2018, 1, 16).getTime());
        expect(LunarCalendarVn.getGregorianDate(2019, 1, 1)?.getTime()).toBe(new Date(2019, 1, 5).getTime());
        expect(LunarCalendarVn.getGregorianDate(2020, 1, 1)?.getTime()).toBe(new Date(2020, 0, 25).getTime());
        expect(LunarCalendarVn.getGregorianDate(2020, 1, 1)?.getTime()).toBe(new Date(2020, 0, 25).getTime());
        expect(LunarCalendarVn.getGregorianDate(2021, 1, 1)?.getTime()).toBe(new Date(2021, 1, 12).getTime());
        expect(LunarCalendarVn.getGregorianDate(2022, 1, 1)?.getTime()).toBe(new Date(2022, 1, 1).getTime());
        expect(LunarCalendarVn.getGregorianDate(2023, 1, 1)?.getTime()).toBe(new Date(2023, 0, 22).getTime());
        expect(LunarCalendarVn.getGregorianDate(2024, 1, 1)?.getTime()).toBe(new Date(2024, 1, 10).getTime());
        expect(LunarCalendarVn.getGregorianDate(2025, 1, 1)?.getTime()).toBe(new Date(2025, 0, 29).getTime());
        expect(LunarCalendarVn.getGregorianDate(2026, 1, 1)?.getTime()).toBe(new Date(2026, 1, 17).getTime());
        expect(LunarCalendarVn.getGregorianDate(2027, 1, 1)?.getTime()).toBe(new Date(2027, 1, 6).getTime());
        expect(LunarCalendarVn.getGregorianDate(2028, 1, 1)?.getTime()).toBe(new Date(2028, 0, 26).getTime());
        expect(LunarCalendarVn.getGregorianDate(2029, 1, 1)?.getTime()).toBe(new Date(2029, 1, 13).getTime());
        expect(LunarCalendarVn.getGregorianDate(2030, 1, 1)?.getTime()).toBe(new Date(2030, 1, 2).getTime());
    });
});

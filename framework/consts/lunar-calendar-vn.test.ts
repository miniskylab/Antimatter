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
        expect(LunarCalendarVn.getLunarDate(new Date(2019, 1, 5))).toEqual([2019, 1, 1, 0]);
        expect(LunarCalendarVn.getLunarDate(new Date(2019, 2, 6))).toEqual([2019, 2, 1, 0]);

        expect(LunarCalendarVn.getGregorianDate(2004, 2, 1, true).getTime()).toBe(new Date(2004, 2, 21).getTime());
        expect(LunarCalendarVn.getGregorianDate(2004, 2, 1).getTime()).toBe(new Date(2004, 1, 20).getTime());
        expect(LunarCalendarVn.getGregorianDate(2004, 1, 1).getTime()).toBe(new Date(2004, 0, 22).getTime());
        expect(LunarCalendarVn.getGregorianDate(2005, 1, 1).getTime()).toBe(new Date(2005, 1, 9).getTime());
        expect(LunarCalendarVn.getGregorianDate(2006, 1, 1).getTime()).toBe(new Date(2006, 0, 29).getTime());
        expect(LunarCalendarVn.getGregorianDate(2018, 1, 1).getTime()).toBe(new Date(2018, 1, 16).getTime());
        expect(LunarCalendarVn.getGregorianDate(2019, 1, 1).getTime()).toBe(new Date(2019, 1, 5).getTime());
        expect(LunarCalendarVn.getGregorianDate(2020, 1, 1).getTime()).toBe(new Date(2020, 0, 25).getTime());
        expect(LunarCalendarVn.getGregorianDate(2003, 2, 1, true)).toBe(null);
        expect(LunarCalendarVn.getGregorianDate(2003, 0, 1)).toBe(null);
        expect(LunarCalendarVn.getGregorianDate(2003, 13, 1)).toBe(null);
        expect(LunarCalendarVn.getGregorianDate(2018, 1, 30)).toBe(null);
    });
});

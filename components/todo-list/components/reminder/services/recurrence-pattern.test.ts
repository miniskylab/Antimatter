import {DueDateType} from "../enums";
import {getDueDate} from "./recurrence-pattern";

describe("how to use 'getDueDate(...)'", () =>
{
    it("parses yearly recurrence pattern correctly", () =>
    {
        const recurrencePattern = "0 0 0 31 3 ? *";

        let dueDateType = DueDateType.NextDueDate;
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 31))).toEqual(new Date(1993, 2, 31));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 4, 31))).toEqual(new Date(1994, 2, 31));

        dueDateType = DueDateType.PreviousDueDate;
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 31))).toEqual(new Date(1992, 2, 31));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 4, 31))).toEqual(new Date(1993, 2, 31));
    });

    it("parses monthly recurrence pattern correctly", () =>
    {
        const recurrencePattern = "0 0 0 31 * ? *";

        let dueDateType = DueDateType.NextDueDate;
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1992, 11, 31))).toEqual(new Date(1993, 0, 31));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 31))).toEqual(new Date(1993, 2, 31));

        dueDateType = DueDateType.PreviousDueDate;
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 31))).toEqual(new Date(1992, 11, 31));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 2, 31))).toEqual(new Date(1993, 0, 31));
    });

    it("parses weekly recurrence pattern correctly", () =>
    {
        let dueDateType = DueDateType.NextDueDate;
        expect(getDueDate("45 30 10 ? * 5 *", dueDateType, new Date(1993, 1, 18, 10, 30, 45))).toEqual(new Date(1993, 1, 25, 10, 30, 45));
        expect(getDueDate("45 30 10 ? * 5 *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 2, 4, 10, 30, 45));
        expect(getDueDate("45 30 10 ? * 1,7 *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 27, 10, 30, 45));
        expect(getDueDate("45 30 10 ? * 2,6 *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 26, 10, 30, 45));
        expect(getDueDate("45 30 10 ? * 3,4 *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 2, 2, 10, 30, 45));

        dueDateType = DueDateType.PreviousDueDate;
        expect(getDueDate("45 30 10 ? * 5 *", dueDateType, new Date(1993, 2, 4, 10, 30, 45))).toEqual(new Date(1993, 1, 25, 10, 30, 45));
        expect(getDueDate("45 30 10 ? * 5 *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 18, 10, 30, 45));
        expect(getDueDate("45 30 10 ? * 1,7 *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 21, 10, 30, 45));
        expect(getDueDate("45 30 10 ? * 2,6 *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 22, 10, 30, 45));
        expect(getDueDate("45 30 10 ? * 6,7 *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 20, 10, 30, 45));
    });

    it("parses daily recurrence pattern correctly", () =>
    {
        const recurrencePattern = "45 30 10 * * ? *";
        let dueDateType = DueDateType.NextDueDate;

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 9, 30, 45))).toEqual(new Date(1993, 11, 31, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 10, 29, 45))).toEqual(new Date(1993, 11, 31, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 10, 30, 44))).toEqual(new Date(1993, 11, 31, 10, 30, 45));

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 11, 30, 45))).toEqual(new Date(1994, 0, 1, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 10, 31, 45))).toEqual(new Date(1994, 0, 1, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 10, 30, 46))).toEqual(new Date(1994, 0, 1, 10, 30, 45));

        dueDateType = DueDateType.PreviousDueDate;

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 9, 30, 45))).toEqual(new Date(1992, 11, 31, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 10, 29, 45))).toEqual(new Date(1992, 11, 31, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 10, 30, 44))).toEqual(new Date(1992, 11, 31, 10, 30, 45));

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 11, 30, 45))).toEqual(new Date(1993, 0, 1, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 10, 31, 45))).toEqual(new Date(1993, 0, 1, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 10, 30, 46))).toEqual(new Date(1993, 0, 1, 10, 30, 45));
    });

    it("parses hourly recurrence pattern correctly", () =>
    {
        const recurrencePattern = "45 30 * * * ? *";
        let dueDateType = DueDateType.NextDueDate;

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 23, 29, 45))).toEqual(new Date(1993, 11, 31, 23, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 23, 30, 44))).toEqual(new Date(1993, 11, 31, 23, 30, 45));

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 23, 31, 45))).toEqual(new Date(1994, 0, 1, 0, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 23, 30, 46))).toEqual(new Date(1994, 0, 1, 0, 30, 45));

        dueDateType = DueDateType.PreviousDueDate;

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 0, 29, 45))).toEqual(new Date(1992, 11, 31, 23, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 0, 30, 44))).toEqual(new Date(1992, 11, 31, 23, 30, 45));

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 0, 31, 45))).toEqual(new Date(1993, 0, 1, 0, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 0, 30, 46))).toEqual(new Date(1993, 0, 1, 0, 30, 45));
    });

    it("parses minutely recurrence pattern correctly", () =>
    {
        const recurrencePattern = "45 * * * * ? *";

        let dueDateType = DueDateType.NextDueDate;
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 23, 59, 44))).toEqual(new Date(1993, 11, 31, 23, 59, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 23, 59, 46))).toEqual(new Date(1994, 0, 1, 0, 0, 45));

        dueDateType = DueDateType.PreviousDueDate;
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 0, 0, 44))).toEqual(new Date(1992, 11, 31, 23, 59, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 0, 0, 46))).toEqual(new Date(1993, 0, 1, 0, 0, 45));
    });

    it("parses secondly recurrence pattern correctly", () =>
    {
        const recurrencePattern = "* * * * * ? *";

        let dueDateType = DueDateType.NextDueDate;
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 11, 31, 23, 59, 59))).toEqual(new Date(1994, 0, 1, 0, 0, 0));

        dueDateType = DueDateType.PreviousDueDate;
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 0, 1, 0, 0, 0))).toEqual(new Date(1992, 11, 31, 23, 59, 59));
    });

    it("parses exact date recurrence pattern correctly", () =>
    {
        [DueDateType.NextDueDate, DueDateType.PreviousDueDate].forEach(dueDateType =>
        {
            const recurrencePattern = "0 0 0 25 2 ? 1993";
            const expectedNextDueDate = new Date(1993, 1, 25);
            expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 24))).toEqual(expectedNextDueDate);
            expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25))).toEqual(expectedNextDueDate);
            expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 26))).toEqual(expectedNextDueDate);
        });
    });

    it("parses duration recurrence pattern correctly", () =>
    {
        let dueDateType = DueDateType.NextDueDate;
        expect(getDueDate("0 0 0 5", dueDateType, new Date(1993, 11, 31, 23, 59, 59))).toEqual(new Date(1994, 0, 5, 23, 59, 59));

        dueDateType = DueDateType.PreviousDueDate;
        expect(getDueDate("0 0 0 5", dueDateType, new Date(1993, 0, 1, 0, 0, 0))).toEqual(new Date(1992, 11, 27, 0, 0, 0));
    });

    it("parses invalid recurrence pattern as 'undefined'", () =>
    {
        [DueDateType.NextDueDate, DueDateType.PreviousDueDate].forEach(dueDateType =>
        {
            expect(getDueDate(null, dueDateType, new Date())).toBeUndefined();
            expect(getDueDate(undefined, dueDateType, new Date())).toBeUndefined();
            expect(getDueDate("* * * * *", dueDateType, new Date())).toBeUndefined();
            expect(getDueDate("0 0 0 * 0", dueDateType, new Date())).toBeUndefined();
            expect(getDueDate("0 0 0 ? 0", dueDateType, new Date())).toBeUndefined();
            expect(getDueDate("* * * * * * *", dueDateType, new Date())).toBeUndefined();
            expect(getDueDate("* * * ? * ? *", dueDateType, new Date())).toBeUndefined();
            expect(getDueDate("* * * ? * 12,4,6 *", dueDateType, new Date())).toBeUndefined();
            expect(getDueDate("* * * ? * 1,2,,4,6 *", dueDateType, new Date())).toBeUndefined();
            expect(getDueDate("45 30 10 25 2 3 1993", dueDateType, new Date())).toBeUndefined();
            expect(getDueDate("this-is-random-text", dueDateType, new Date())).toBeUndefined();
        });
    });

    it("always returns next due date greater than input 'today'", () =>
    {
        const dueDateType = DueDateType.NextDueDate;
        expect(getDueDate("0 0 0 31 3 ? *", dueDateType, new Date(1993, 2, 31))).toEqual(new Date(1994, 2, 31));
        expect(getDueDate("0 0 0 31 * ? *", dueDateType, new Date(1993, 2, 31))).toEqual(new Date(1993, 4, 31));
        expect(getDueDate("45 30 10 * * ? *", dueDateType, new Date(1993, 11, 31, 10, 30, 45))).toEqual(new Date(1994, 0, 1, 10, 30, 45));
        expect(getDueDate("45 30 * * * ? *", dueDateType, new Date(1993, 11, 31, 23, 30, 45))).toEqual(new Date(1994, 0, 1, 0, 30, 45));
        expect(getDueDate("45 * * * * ? *", dueDateType, new Date(1993, 11, 31, 23, 59, 45))).toEqual(new Date(1994, 0, 1, 0, 0, 45));
    });

    it("always returns previous due date less than input 'today'", () =>
    {
        const dueDateType = DueDateType.PreviousDueDate;
        expect(getDueDate("0 0 0 31 3 ? *", dueDateType, new Date(1993, 2, 31))).toEqual(new Date(1992, 2, 31));
        expect(getDueDate("0 0 0 31 * ? *", dueDateType, new Date(1993, 2, 31))).toEqual(new Date(1993, 0, 31));
        expect(getDueDate("45 30 10 * * ? *", dueDateType, new Date(1993, 0, 1, 10, 30, 45))).toEqual(new Date(1992, 11, 31, 10, 30, 45));
        expect(getDueDate("45 30 * * * ? *", dueDateType, new Date(1993, 0, 1, 0, 30, 45))).toEqual(new Date(1992, 11, 31, 23, 30, 45));
        expect(getDueDate("45 * * * * ? *", dueDateType, new Date(1993, 0, 1, 0, 0, 45))).toEqual(new Date(1992, 11, 31, 23, 59, 45));
    });
});

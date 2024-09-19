import {DueDateType} from "../enums";
import {getDueDate} from "./recurrence-pattern";

describe("how to use 'getDueDate(...)' to get next due date from input recurrence pattern", () =>
{
    const dueDateType = DueDateType.NextDueDate;

    it("parses yearly recurrence pattern correctly", () =>
    {
        const recurrencePattern = "0 0 0 25 2 ? *";
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 24))).toEqual(new Date(1993, 1, 25));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 26))).toEqual(new Date(1994, 1, 25));
    });

    it("parses monthly recurrence pattern correctly", () =>
    {
        const recurrencePattern = "0 0 0 25 * ? *";
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 24))).toEqual(new Date(1993, 1, 25));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 26))).toEqual(new Date(1993, 2, 25));
    });

    it("parses daily recurrence pattern correctly", () =>
    {
        const recurrencePattern = "45 30 10 * * ? *";

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 9, 30, 45))).toEqual(new Date(1993, 1, 25, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 29, 45))).toEqual(new Date(1993, 1, 25, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 44))).toEqual(new Date(1993, 1, 25, 10, 30, 45));

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 11, 30, 45))).toEqual(new Date(1993, 1, 26, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 31, 45))).toEqual(new Date(1993, 1, 26, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 46))).toEqual(new Date(1993, 1, 26, 10, 30, 45));
    });

    it("parses hourly recurrence pattern correctly", () =>
    {
        const recurrencePattern = "45 30 * * * ? *";

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 29, 45))).toEqual(new Date(1993, 1, 25, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 44))).toEqual(new Date(1993, 1, 25, 10, 30, 45));

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 31, 45))).toEqual(new Date(1993, 1, 25, 11, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 46))).toEqual(new Date(1993, 1, 25, 11, 30, 45));
    });

    it("parses minutely recurrence pattern correctly", () =>
    {
        const recurrencePattern = "45 * * * * ? *";

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 44))).toEqual(new Date(1993, 1, 25, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 46))).toEqual(new Date(1993, 1, 25, 10, 31, 45));
    });

    it("parses secondly recurrence pattern correctly", () =>
    {
        expect(getDueDate("* * * * * ? *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 25, 10, 30, 46));
    });

    it("always returns next due date greater than input 'today'", () =>
    {
        expect(getDueDate("0 0 0 25 2 ? *", dueDateType, new Date(1993, 1, 25))).toEqual(new Date(1994, 1, 25));
        expect(getDueDate("0 0 0 25 * ? *", dueDateType, new Date(1993, 1, 25))).toEqual(new Date(1993, 2, 25));
        expect(getDueDate("45 30 10 * * ? *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 26, 10, 30, 45));
        expect(getDueDate("45 30 * * * ? *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 25, 11, 30, 45));
        expect(getDueDate("45 * * * * ? *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 25, 10, 31, 45));
    });
});

describe("how to use 'getDueDate(...)' to get previous due date from input recurrence pattern", () =>
{
    // const dueDateType = DueDateType.PreviousDueDate;
});

it("parses invalid recurrence pattern as 'undefined'", () =>
{
    [DueDateType.NextDueDate, DueDateType.PreviousDueDate].forEach(dueDateType =>
    {
        expect(getDueDate(null, dueDateType, new Date())).toBeUndefined();
        expect(getDueDate(undefined, dueDateType, new Date())).toBeUndefined();
        expect(getDueDate("this-is-random-text", dueDateType, new Date())).toBeUndefined();
    });
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

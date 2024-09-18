import {DueDateType} from "../enums";
import {getDueDate} from "./recurrence-pattern";

test("invalid recurrence pattern is parsed as 'undefined'", () =>
{
    [DueDateType.NextDueDate, DueDateType.PreviousDueDate].forEach(dueDateType =>
    {
        expect(getDueDate(null, dueDateType, new Date())).toBeUndefined();
        expect(getDueDate(undefined, dueDateType, new Date())).toBeUndefined();
        expect(getDueDate("this-is-random-text", dueDateType, new Date())).toBeUndefined();
    });
});

test("exact date recurrence pattern is parsed correctly", () =>
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

describe("get next due date from recurrence pattern", () =>
{
    const dueDateType = DueDateType.NextDueDate;

    test("yearly recurrence pattern is parsed correctly", () =>
    {
        const recurrencePattern = "0 0 0 25 2 ? *";
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 24))).toEqual(new Date(1993, 1, 25));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25))).toEqual(new Date(1994, 1, 25));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 26))).toEqual(new Date(1994, 1, 25));
    });

    test("monthly recurrence pattern is parsed correctly", () =>
    {
        const recurrencePattern = "0 0 0 25 * ? *";
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 24))).toEqual(new Date(1993, 1, 25));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25))).toEqual(new Date(1993, 2, 25));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 26))).toEqual(new Date(1993, 2, 25));
    });

    test("daily recurrence pattern is parsed correctly", () =>
    {
        const recurrencePattern = "45 30 10 * * ? *";

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 9, 30, 45))).toEqual(new Date(1993, 1, 25, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 29, 45))).toEqual(new Date(1993, 1, 25, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 44))).toEqual(new Date(1993, 1, 25, 10, 30, 45));

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 26, 10, 30, 45));

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 46))).toEqual(new Date(1993, 1, 26, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 31, 45))).toEqual(new Date(1993, 1, 26, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 11, 30, 45))).toEqual(new Date(1993, 1, 26, 10, 30, 45));
    });

    test("hourly recurrence pattern is parsed correctly", () =>
    {
        const recurrencePattern = "45 30 * * * ? *";

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 29, 45))).toEqual(new Date(1993, 1, 25, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 44))).toEqual(new Date(1993, 1, 25, 10, 30, 45));

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 25, 11, 30, 45));

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 31, 45))).toEqual(new Date(1993, 1, 25, 11, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 46))).toEqual(new Date(1993, 1, 25, 11, 30, 45));
    });

    test("minutely recurrence pattern is parsed correctly", () =>
    {
        const recurrencePattern = "45 * * * * ? *";

        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 44))).toEqual(new Date(1993, 1, 25, 10, 30, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 25, 10, 31, 45));
        expect(getDueDate(recurrencePattern, dueDateType, new Date(1993, 1, 25, 10, 30, 46))).toEqual(new Date(1993, 1, 25, 10, 31, 45));
    });

    test("secondly recurrence pattern is parsed correctly", () =>
    {
        expect(getDueDate("* * * * * ? *", dueDateType, new Date(1993, 1, 25, 10, 30, 45))).toEqual(new Date(1993, 1, 25, 10, 30, 46));
    });
});

describe("get previous due date from recurrence pattern", () =>
{
    // const dueDateType = DueDateType.PreviousDueDate;
});

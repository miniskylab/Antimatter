import {Keypress} from "../enums";
import {getNextNumericInputFieldState} from "./numeric-input-field-state-manager";

describe("enter single digit continuously", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "",
            {start: 0},
            {keypress: Keypress.Digit, newUserInput: "1"}
        )).toEqual({
            nextValue: 1,
            nextUserInput: "1",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "1",
            {start: 1},
            {keypress: Keypress.Digit, newUserInput: "12"}
        )).toEqual({
            nextValue: 12,
            nextUserInput: "12",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "12",
            {start: 2},
            {keypress: Keypress.Digit, newUserInput: "123"}
        )).toEqual({
            nextValue: 123,
            nextUserInput: "123",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "123",
            {start: 3},
            {keypress: Keypress.Digit, newUserInput: "1234"}
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "1,234",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "1,234",
            {start: 5},
            {keypress: Keypress.Digit, newUserInput: "1,2345"}
        )).toEqual({
            nextValue: 12345,
            nextUserInput: "12,345",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "12,345",
            {start: 6},
            {keypress: Keypress.Digit, newUserInput: "12,3456"}
        )).toEqual({
            nextValue: 123456,
            nextUserInput: "123,456",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "123,456",
            {start: 7},
            {keypress: Keypress.Digit, newUserInput: "123,4567"}
        )).toEqual({
            nextValue: 1234567,
            nextUserInput: "1,234,567",
            nextSelection: {start: 9}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567",
            {start: 9},
            {keypress: Keypress.Digit, newUserInput: "1,234,5678"}
        )).toEqual({
            nextValue: 12345678,
            nextUserInput: "12,345,678",
            nextSelection: {start: 10}
        });

        expect(getNextNumericInputFieldState(
            "12,345,678",
            {start: 10},
            {keypress: Keypress.Digit, newUserInput: "12,345,6789"}
        )).toEqual({
            nextValue: 123456789,
            nextUserInput: "123,456,789",
            nextSelection: {start: 11}
        });

        expect(getNextNumericInputFieldState(
            "123,456,789",
            {start: 11},
            {keypress: Keypress.Digit, newUserInput: "123,456,7890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 13}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 13},
            {keypress: Keypress.Dot, newUserInput: "1,234,567,890."}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890.",
            nextSelection: {start: 14}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890.",
            {start: 14},
            {keypress: Keypress.Digit, newUserInput: "1,234,567,890.1"}
        )).toEqual({
            nextValue: 1234567890.1,
            nextUserInput: "1,234,567,890.1",
            nextSelection: {start: 15}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890.1",
            {start: 15},
            {keypress: Keypress.Digit, newUserInput: "1,234,567,890.12"}
        )).toEqual({
            nextValue: 1234567890.12,
            nextUserInput: "1,234,567,890.12",
            nextSelection: {start: 16}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890.12",
            {start: 16},
            {keypress: Keypress.Digit, newUserInput: "1,234,567,890.123"}
        )).toEqual({
            nextValue: 1234567890.123,
            nextUserInput: "1,234,567,890.123",
            nextSelection: {start: 17}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890.123",
            {start: 17},
            {keypress: Keypress.Digit, newUserInput: "1,234,567,890.1234"}
        )).toEqual({
            nextValue: 1234567890.1234,
            nextUserInput: "1,234,567,890.1234",
            nextSelection: {start: 18}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890.1234",
            {start: 18},
            {keypress: Keypress.Digit, newUserInput: "1,234,567,890.12345"}
        )).toEqual({
            nextValue: 1234567890.12345,
            nextUserInput: "1,234,567,890.12345",
            nextSelection: {start: 19}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "",
            {start: 0},
            {keypress: Keypress.Digit, newUserInput: "1"},
            true
        )).toEqual({
            nextValue: 1,
            nextUserInput: "+1",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "+1",
            {start: 2},
            {keypress: Keypress.Digit, newUserInput: "+12"},
            true
        )).toEqual({
            nextValue: 12,
            nextUserInput: "+12",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+12",
            {start: 3},
            {keypress: Keypress.Digit, newUserInput: "+123"},
            true
        )).toEqual({
            nextValue: 123,
            nextUserInput: "+123",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "+123",
            {start: 4},
            {keypress: Keypress.Digit, newUserInput: "+1234"},
            true
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "+1,234",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+1,234",
            {start: 6},
            {keypress: Keypress.Digit, newUserInput: "+1,2345"},
            true
        )).toEqual({
            nextValue: 12345,
            nextUserInput: "+12,345",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "+12,345",
            {start: 7},
            {keypress: Keypress.Digit, newUserInput: "+12,3456"},
            true
        )).toEqual({
            nextValue: 123456,
            nextUserInput: "+123,456",
            nextSelection: {start: 8}
        });

        expect(getNextNumericInputFieldState(
            "+123,456",
            {start: 8},
            {keypress: Keypress.Digit, newUserInput: "+123,4567"},
            true
        )).toEqual({
            nextValue: 1234567,
            nextUserInput: "+1,234,567",
            nextSelection: {start: 10}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567",
            {start: 10},
            {keypress: Keypress.Digit, newUserInput: "+1,234,5678"},
            true
        )).toEqual({
            nextValue: 12345678,
            nextUserInput: "+12,345,678",
            nextSelection: {start: 11}
        });

        expect(getNextNumericInputFieldState(
            "+12,345,678",
            {start: 11},
            {keypress: Keypress.Digit, newUserInput: "+12,345,6789"},
            true
        )).toEqual({
            nextValue: 123456789,
            nextUserInput: "+123,456,789",
            nextSelection: {start: 12}
        });

        expect(getNextNumericInputFieldState(
            "+123,456,789",
            {start: 12},
            {keypress: Keypress.Digit, newUserInput: "+123,456,7890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 14}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 14},
            {keypress: Keypress.Dot, newUserInput: "+1,234,567,890."},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890.",
            nextSelection: {start: 15}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890.",
            {start: 15},
            {keypress: Keypress.Digit, newUserInput: "+1,234,567,890.1"},
            true
        )).toEqual({
            nextValue: 1234567890.1,
            nextUserInput: "+1,234,567,890.1",
            nextSelection: {start: 16}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890.1",
            {start: 16},
            {keypress: Keypress.Digit, newUserInput: "+1,234,567,890.12"},
            true
        )).toEqual({
            nextValue: 1234567890.12,
            nextUserInput: "+1,234,567,890.12",
            nextSelection: {start: 17}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890.12",
            {start: 17},
            {keypress: Keypress.Digit, newUserInput: "+1,234,567,890.123"},
            true
        )).toEqual({
            nextValue: 1234567890.123,
            nextUserInput: "+1,234,567,890.123",
            nextSelection: {start: 18}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890.123",
            {start: 18},
            {keypress: Keypress.Digit, newUserInput: "+1,234,567,890.1234"},
            true
        )).toEqual({
            nextValue: 1234567890.1234,
            nextUserInput: "+1,234,567,890.1234",
            nextSelection: {start: 19}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890.1234",
            {start: 19},
            {keypress: Keypress.Digit, newUserInput: "+1,234,567,890.12345"},
            true
        )).toEqual({
            nextValue: 1234567890.12345,
            nextUserInput: "+1,234,567,890.12345",
            nextSelection: {start: 20}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "",
                {start: 0},
                {keypress: Keypress.Minus, newUserInput: "-"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: 0,
                nextUserInput: "-",
                nextSelection: {start: 1}
            });

            expect(getNextNumericInputFieldState(
                "-",
                {start: 1},
                {keypress: Keypress.Digit, newUserInput: "-1"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1,
                nextUserInput: "-1",
                nextSelection: {start: 2}
            });

            expect(getNextNumericInputFieldState(
                "-1",
                {start: 2},
                {keypress: Keypress.Digit, newUserInput: "-12"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12,
                nextUserInput: "-12",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-12",
                {start: 3},
                {keypress: Keypress.Digit, newUserInput: "-123"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123,
                nextUserInput: "-123",
                nextSelection: {start: 4}
            });

            expect(getNextNumericInputFieldState(
                "-123",
                {start: 4},
                {keypress: Keypress.Digit, newUserInput: "-1234"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234,
                nextUserInput: "-1,234",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-1,234",
                {start: 6},
                {keypress: Keypress.Digit, newUserInput: "-1,2345"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12345,
                nextUserInput: "-12,345",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "-12,345",
                {start: 7},
                {keypress: Keypress.Digit, newUserInput: "-12,3456"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123456,
                nextUserInput: "-123,456",
                nextSelection: {start: 8}
            });

            expect(getNextNumericInputFieldState(
                "-123,456",
                {start: 8},
                {keypress: Keypress.Digit, newUserInput: "-123,4567"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567,
                nextUserInput: "-1,234,567",
                nextSelection: {start: 10}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567",
                {start: 10},
                {keypress: Keypress.Digit, newUserInput: "-1,234,5678"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12345678,
                nextUserInput: "-12,345,678",
                nextSelection: {start: 11}
            });

            expect(getNextNumericInputFieldState(
                "-12,345,678",
                {start: 11},
                {keypress: Keypress.Digit, newUserInput: "-12,345,6789"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123456789,
                nextUserInput: "-123,456,789",
                nextSelection: {start: 12}
            });

            expect(getNextNumericInputFieldState(
                "-123,456,789",
                {start: 12},
                {keypress: Keypress.Digit, newUserInput: "-123,456,7890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 14}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 14},
                {keypress: Keypress.Dot, newUserInput: "-1,234,567,890."},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890.",
                nextSelection: {start: 15}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890.",
                {start: 15},
                {keypress: Keypress.Digit, newUserInput: "-1,234,567,890.1"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890.1,
                nextUserInput: "-1,234,567,890.1",
                nextSelection: {start: 16}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890.1",
                {start: 16},
                {keypress: Keypress.Digit, newUserInput: "-1,234,567,890.12"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890.12,
                nextUserInput: "-1,234,567,890.12",
                nextSelection: {start: 17}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890.12",
                {start: 17},
                {keypress: Keypress.Digit, newUserInput: "-1,234,567,890.123"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890.123,
                nextUserInput: "-1,234,567,890.123",
                nextSelection: {start: 18}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890.123",
                {start: 18},
                {keypress: Keypress.Digit, newUserInput: "-1,234,567,890.1234"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890.1234,
                nextUserInput: "-1,234,567,890.1234",
                nextSelection: {start: 19}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890.1234",
                {start: 19},
                {keypress: Keypress.Digit, newUserInput: "-1,234,567,890.12345"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890.12345,
                nextUserInput: "-1,234,567,890.12345",
                nextSelection: {start: 20}
            });
        });
    });
});

describe("put caret at the end then press 'backspace' continuously", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890.12345",
            {start: 19},
            {keypress: Keypress.Backspace, newUserInput: "1,234,567,890.1234"}
        )).toEqual({
            nextValue: 1234567890.1234,
            nextUserInput: "1,234,567,890.1234",
            nextSelection: {start: 18}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890.1234",
            {start: 18},
            {keypress: Keypress.Backspace, newUserInput: "1,234,567,890.123"}
        )).toEqual({
            nextValue: 1234567890.123,
            nextUserInput: "1,234,567,890.123",
            nextSelection: {start: 17}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890.123",
            {start: 17},
            {keypress: Keypress.Backspace, newUserInput: "1,234,567,890.12"}
        )).toEqual({
            nextValue: 1234567890.12,
            nextUserInput: "1,234,567,890.12",
            nextSelection: {start: 16}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890.12",
            {start: 16},
            {keypress: Keypress.Backspace, newUserInput: "1,234,567,890.1"}
        )).toEqual({
            nextValue: 1234567890.1,
            nextUserInput: "1,234,567,890.1",
            nextSelection: {start: 15}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890.1",
            {start: 15},
            {keypress: Keypress.Backspace, newUserInput: "1,234,567,890."}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890.",
            nextSelection: {start: 14}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890.",
            {start: 14},
            {keypress: Keypress.Backspace, newUserInput: "1,234,567,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 13}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 13},
            {keypress: Keypress.Backspace, newUserInput: "1,234,567,89"}
        )).toEqual({
            nextValue: 123456789,
            nextUserInput: "123,456,789",
            nextSelection: {start: 11}
        });

        expect(getNextNumericInputFieldState(
            "123,456,789",
            {start: 11},
            {keypress: Keypress.Backspace, newUserInput: "123,456,78"}
        )).toEqual({
            nextValue: 12345678,
            nextUserInput: "12,345,678",
            nextSelection: {start: 10}
        });

        expect(getNextNumericInputFieldState(
            "12,345,678",
            {start: 10},
            {keypress: Keypress.Backspace, newUserInput: "12,345,67"}
        )).toEqual({
            nextValue: 1234567,
            nextUserInput: "1,234,567",
            nextSelection: {start: 9}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567",
            {start: 9},
            {keypress: Keypress.Backspace, newUserInput: "1,234,56"}
        )).toEqual({
            nextValue: 123456,
            nextUserInput: "123,456",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "123,456",
            {start: 7},
            {keypress: Keypress.Backspace, newUserInput: "123,45"}
        )).toEqual({
            nextValue: 12345,
            nextUserInput: "12,345",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "12,345",
            {start: 6},
            {keypress: Keypress.Backspace, newUserInput: "12,34"}
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "1,234",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "1,234",
            {start: 5},
            {keypress: Keypress.Backspace, newUserInput: "1,23"}
        )).toEqual({
            nextValue: 123,
            nextUserInput: "123",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "123",
            {start: 3},
            {keypress: Keypress.Backspace, newUserInput: "12"}
        )).toEqual({
            nextValue: 12,
            nextUserInput: "12",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "12",
            {start: 2},
            {keypress: Keypress.Backspace, newUserInput: "1"}
        )).toEqual({
            nextValue: 1,
            nextUserInput: "1",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "1",
            {start: 1},
            {keypress: Keypress.Backspace, newUserInput: ""}
        )).toEqual({
            nextValue: NaN,
            nextUserInput: "",
            nextSelection: {start: 0}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890.12345",
            {start: 20},
            {keypress: Keypress.Backspace, newUserInput: "+1,234,567,890.1234"},
            true
        )).toEqual({
            nextValue: 1234567890.1234,
            nextUserInput: "+1,234,567,890.1234",
            nextSelection: {start: 19}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890.1234",
            {start: 19},
            {keypress: Keypress.Backspace, newUserInput: "+1,234,567,890.123"},
            true
        )).toEqual({
            nextValue: 1234567890.123,
            nextUserInput: "+1,234,567,890.123",
            nextSelection: {start: 18}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890.123",
            {start: 18},
            {keypress: Keypress.Backspace, newUserInput: "+1,234,567,890.12"},
            true
        )).toEqual({
            nextValue: 1234567890.12,
            nextUserInput: "+1,234,567,890.12",
            nextSelection: {start: 17}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890.12",
            {start: 17},
            {keypress: Keypress.Backspace, newUserInput: "+1,234,567,890.1"},
            true
        )).toEqual({
            nextValue: 1234567890.1,
            nextUserInput: "+1,234,567,890.1",
            nextSelection: {start: 16}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890.1",
            {start: 16},
            {keypress: Keypress.Backspace, newUserInput: "+1,234,567,890."},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890.",
            nextSelection: {start: 15}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890.",
            {start: 15},
            {keypress: Keypress.Backspace, newUserInput: "+1,234,567,890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 14}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 14},
            {keypress: Keypress.Backspace, newUserInput: "+1,234,567,89"},
            true
        )).toEqual({
            nextValue: 123456789,
            nextUserInput: "+123,456,789",
            nextSelection: {start: 12}
        });

        expect(getNextNumericInputFieldState(
            "+123,456,789",
            {start: 12},
            {keypress: Keypress.Backspace, newUserInput: "+123,456,78"},
            true
        )).toEqual({
            nextValue: 12345678,
            nextUserInput: "+12,345,678",
            nextSelection: {start: 11}
        });

        expect(getNextNumericInputFieldState(
            "+12,345,678",
            {start: 11},
            {keypress: Keypress.Backspace, newUserInput: "+12,345,67"},
            true
        )).toEqual({
            nextValue: 1234567,
            nextUserInput: "+1,234,567",
            nextSelection: {start: 10}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567",
            {start: 10},
            {keypress: Keypress.Backspace, newUserInput: "+1,234,56"},
            true
        )).toEqual({
            nextValue: 123456,
            nextUserInput: "+123,456",
            nextSelection: {start: 8}
        });

        expect(getNextNumericInputFieldState(
            "+123,456",
            {start: 8},
            {keypress: Keypress.Backspace, newUserInput: "+123,45"},
            true
        )).toEqual({
            nextValue: 12345,
            nextUserInput: "+12,345",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "+12,345",
            {start: 7},
            {keypress: Keypress.Backspace, newUserInput: "+12,34"},
            true
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "+1,234",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+1,234",
            {start: 6},
            {keypress: Keypress.Backspace, newUserInput: "+1,23"},
            true
        )).toEqual({
            nextValue: 123,
            nextUserInput: "+123",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "+123",
            {start: 4},
            {keypress: Keypress.Backspace, newUserInput: "+12"},
            true
        )).toEqual({
            nextValue: 12,
            nextUserInput: "+12",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+12",
            {start: 3},
            {keypress: Keypress.Backspace, newUserInput: "+1"},
            true
        )).toEqual({
            nextValue: 1,
            nextUserInput: "+1",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "+1",
            {start: 2},
            {keypress: Keypress.Backspace, newUserInput: "+"},
            true
        )).toEqual({
            nextValue: NaN,
            nextUserInput: "",
            nextSelection: {start: 0}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890.12345",
                {start: 20},
                {keypress: Keypress.Backspace, newUserInput: "-1,234,567,890.1234"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890.1234,
                nextUserInput: "-1,234,567,890.1234",
                nextSelection: {start: 19}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890.1234",
                {start: 19},
                {keypress: Keypress.Backspace, newUserInput: "-1,234,567,890.123"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890.123,
                nextUserInput: "-1,234,567,890.123",
                nextSelection: {start: 18}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890.123",
                {start: 18},
                {keypress: Keypress.Backspace, newUserInput: "-1,234,567,890.12"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890.12,
                nextUserInput: "-1,234,567,890.12",
                nextSelection: {start: 17}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890.12",
                {start: 17},
                {keypress: Keypress.Backspace, newUserInput: "-1,234,567,890.1"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890.1,
                nextUserInput: "-1,234,567,890.1",
                nextSelection: {start: 16}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890.1",
                {start: 16},
                {keypress: Keypress.Backspace, newUserInput: "-1,234,567,890."},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890.",
                nextSelection: {start: 15}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890.",
                {start: 15},
                {keypress: Keypress.Backspace, newUserInput: "-1,234,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 14}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 14},
                {keypress: Keypress.Backspace, newUserInput: "-1,234,567,89"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123456789,
                nextUserInput: "-123,456,789",
                nextSelection: {start: 12}
            });

            expect(getNextNumericInputFieldState(
                "-123,456,789",
                {start: 12},
                {keypress: Keypress.Backspace, newUserInput: "-123,456,78"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12345678,
                nextUserInput: "-12,345,678",
                nextSelection: {start: 11}
            });

            expect(getNextNumericInputFieldState(
                "-12,345,678",
                {start: 11},
                {keypress: Keypress.Backspace, newUserInput: "-12,345,67"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567,
                nextUserInput: "-1,234,567",
                nextSelection: {start: 10}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567",
                {start: 10},
                {keypress: Keypress.Backspace, newUserInput: "-1,234,56"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123456,
                nextUserInput: "-123,456",
                nextSelection: {start: 8}
            });

            expect(getNextNumericInputFieldState(
                "-123,456",
                {start: 8},
                {keypress: Keypress.Backspace, newUserInput: "-123,45"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12345,
                nextUserInput: "-12,345",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "-12,345",
                {start: 7},
                {keypress: Keypress.Backspace, newUserInput: "-12,34"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234,
                nextUserInput: "-1,234",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-1,234",
                {start: 6},
                {keypress: Keypress.Backspace, newUserInput: "-1,23"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123,
                nextUserInput: "-123",
                nextSelection: {start: 4}
            });

            expect(getNextNumericInputFieldState(
                "-123",
                {start: 4},
                {keypress: Keypress.Backspace, newUserInput: "-12"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12,
                nextUserInput: "-12",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-12",
                {start: 3},
                {keypress: Keypress.Backspace, newUserInput: "-1"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1,
                nextUserInput: "-1",
                nextSelection: {start: 2}
            });

            expect(getNextNumericInputFieldState(
                "-1",
                {start: 2},
                {keypress: Keypress.Backspace, newUserInput: "-"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: 0,
                nextUserInput: "-",
                nextSelection: {start: 1}
            });

            expect(getNextNumericInputFieldState(
                "-",
                {start: 1},
                {keypress: Keypress.Backspace, newUserInput: ""},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: NaN,
                nextUserInput: "",
                nextSelection: {start: 0}
            });
        });
    });
});

describe("put caret in the middle then press 'backspace' continuously", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 8},
            {keypress: Keypress.Backspace, newUserInput: "1,234,57,890"}
        )).toEqual({
            nextValue: 123457890,
            nextUserInput: "123,457,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "123,457,890",
            {start: 6},
            {keypress: Keypress.Backspace, newUserInput: "123,47,890"}
        )).toEqual({
            nextValue: 12347890,
            nextUserInput: "12,347,890",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "12,347,890",
            {start: 5},
            {keypress: Keypress.Backspace, newUserInput: "12,37,890"}
        )).toEqual({
            nextValue: 1237890,
            nextUserInput: "1,237,890",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,237,890",
            {start: 4},
            {keypress: Keypress.Backspace, newUserInput: "1,27,890"}
        )).toEqual({
            nextValue: 127890,
            nextUserInput: "127,890",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "127,890",
            {start: 2},
            {keypress: Keypress.Backspace, newUserInput: "17,890"}
        )).toEqual({
            nextValue: 17890,
            nextUserInput: "17,890",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "17,890",
            {start: 1},
            {keypress: Keypress.Backspace, newUserInput: "7,890"}
        )).toEqual({
            nextValue: 7890,
            nextUserInput: "7,890",
            nextSelection: {start: 0}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 9},
            {keypress: Keypress.Backspace, newUserInput: "+1,234,57,890"},
            true
        )).toEqual({
            nextValue: 123457890,
            nextUserInput: "+123,457,890",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "+123,457,890",
            {start: 7},
            {keypress: Keypress.Backspace, newUserInput: "+123,47,890"},
            true
        )).toEqual({
            nextValue: 12347890,
            nextUserInput: "+12,347,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+12,347,890",
            {start: 6},
            {keypress: Keypress.Backspace, newUserInput: "+12,37,890"},
            true
        )).toEqual({
            nextValue: 1237890,
            nextUserInput: "+1,237,890",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "+1,237,890",
            {start: 5},
            {keypress: Keypress.Backspace, newUserInput: "+1,27,890"},
            true
        )).toEqual({
            nextValue: 127890,
            nextUserInput: "+127,890",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+127,890",
            {start: 3},
            {keypress: Keypress.Backspace, newUserInput: "+17,890"},
            true
        )).toEqual({
            nextValue: 17890,
            nextUserInput: "+17,890",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "+17,890",
            {start: 2},
            {keypress: Keypress.Backspace, newUserInput: "+7,890"},
            true
        )).toEqual({
            nextValue: 7890,
            nextUserInput: "+7,890",
            nextSelection: {start: 1}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 9},
                {keypress: Keypress.Backspace, newUserInput: "-1,234,57,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123457890,
                nextUserInput: "-123,457,890",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "-123,457,890",
                {start: 7},
                {keypress: Keypress.Backspace, newUserInput: "-123,47,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12347890,
                nextUserInput: "-12,347,890",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-12,347,890",
                {start: 6},
                {keypress: Keypress.Backspace, newUserInput: "-12,37,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1237890,
                nextUserInput: "-1,237,890",
                nextSelection: {start: 5}
            });

            expect(getNextNumericInputFieldState(
                "-1,237,890",
                {start: 5},
                {keypress: Keypress.Backspace, newUserInput: "-1,27,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -127890,
                nextUserInput: "-127,890",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-127,890",
                {start: 3},
                {keypress: Keypress.Backspace, newUserInput: "-17,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -17890,
                nextUserInput: "-17,890",
                nextSelection: {start: 2}
            });

            expect(getNextNumericInputFieldState(
                "-17,890",
                {start: 2},
                {keypress: Keypress.Backspace, newUserInput: "-7,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -7890,
                nextUserInput: "-7,890",
                nextSelection: {start: 1}
            });
        });
    });
});

describe("put caret before comma then press 'backspace' continuously", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 5},
            {keypress: Keypress.Backspace, newUserInput: "1,23,567,890"}
        )).toEqual({
            nextValue: 123567890,
            nextUserInput: "123,567,890",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "123,567,890",
            {start: 3},
            {keypress: Keypress.Backspace, newUserInput: "12,567,890"}
        )).toEqual({
            nextValue: 12567890,
            nextUserInput: "12,567,890",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "12,567,890",
            {start: 2},
            {keypress: Keypress.Backspace, newUserInput: "1,567,890"}
        )).toEqual({
            nextValue: 1567890,
            nextUserInput: "1,567,890",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "1,567,890",
            {start: 1},
            {keypress: Keypress.Backspace, newUserInput: ",567,890"}
        )).toEqual({
            nextValue: 567890,
            nextUserInput: "567,890",
            nextSelection: {start: 0}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 6},
            {keypress: Keypress.Backspace, newUserInput: "+1,23,567,890"},
            true
        )).toEqual({
            nextValue: 123567890,
            nextUserInput: "+123,567,890",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "+123,567,890",
            {start: 4},
            {keypress: Keypress.Backspace, newUserInput: "+12,567,890"},
            true
        )).toEqual({
            nextValue: 12567890,
            nextUserInput: "+12,567,890",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+12,567,890",
            {start: 3},
            {keypress: Keypress.Backspace, newUserInput: "+1,567,890"},
            true
        )).toEqual({
            nextValue: 1567890,
            nextUserInput: "+1,567,890",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "+1,567,890",
            {start: 2},
            {keypress: Keypress.Backspace, newUserInput: "+,567,890"},
            true
        )).toEqual({
            nextValue: 567890,
            nextUserInput: "+567,890",
            nextSelection: {start: 1}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 6},
                {keypress: Keypress.Backspace, newUserInput: "-1,23,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123567890,
                nextUserInput: "-123,567,890",
                nextSelection: {start: 4}
            });

            expect(getNextNumericInputFieldState(
                "-123,567,890",
                {start: 4},
                {keypress: Keypress.Backspace, newUserInput: "-12,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12567890,
                nextUserInput: "-12,567,890",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-12,567,890",
                {start: 3},
                {keypress: Keypress.Backspace, newUserInput: "-1,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1567890,
                nextUserInput: "-1,567,890",
                nextSelection: {start: 2}
            });

            expect(getNextNumericInputFieldState(
                "-1,567,890",
                {start: 2},
                {keypress: Keypress.Backspace, newUserInput: "-,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -567890,
                nextUserInput: "-567,890",
                nextSelection: {start: 1}
            });
        });
    });
});

describe("put caret after comma then press 'backspace' continuously", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 6},
            {keypress: Keypress.Backspace, newUserInput: "1,234567,890"}
        )).toEqual({
            nextValue: 123567890,
            nextUserInput: "123,567,890",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "123,567,890",
            {start: 3},
            {keypress: Keypress.Backspace, newUserInput: "12,567,890"}
        )).toEqual({
            nextValue: 12567890,
            nextUserInput: "12,567,890",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "12,567,890",
            {start: 2},
            {keypress: Keypress.Backspace, newUserInput: "1,567,890"}
        )).toEqual({
            nextValue: 1567890,
            nextUserInput: "1,567,890",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "1,567,890",
            {start: 1},
            {keypress: Keypress.Backspace, newUserInput: ",567,890"}
        )).toEqual({
            nextValue: 567890,
            nextUserInput: "567,890",
            nextSelection: {start: 0}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 7},
            {keypress: Keypress.Backspace, newUserInput: "+1,234567,890"},
            true
        )).toEqual({
            nextValue: 123567890,
            nextUserInput: "+123,567,890",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "+123,567,890",
            {start: 4},
            {keypress: Keypress.Backspace, newUserInput: "+12,567,890"},
            true
        )).toEqual({
            nextValue: 12567890,
            nextUserInput: "+12,567,890",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+12,567,890",
            {start: 3},
            {keypress: Keypress.Backspace, newUserInput: "+1,567,890"},
            true
        )).toEqual({
            nextValue: 1567890,
            nextUserInput: "+1,567,890",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "+1,567,890",
            {start: 2},
            {keypress: Keypress.Backspace, newUserInput: "+,567,890"},
            true
        )).toEqual({
            nextValue: 567890,
            nextUserInput: "+567,890",
            nextSelection: {start: 1}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 7},
                {keypress: Keypress.Backspace, newUserInput: "-1,234567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123567890,
                nextUserInput: "-123,567,890",
                nextSelection: {start: 4}
            });

            expect(getNextNumericInputFieldState(
                "-123,567,890",
                {start: 4},
                {keypress: Keypress.Backspace, newUserInput: "-12,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12567890,
                nextUserInput: "-12,567,890",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-12,567,890",
                {start: 3},
                {keypress: Keypress.Backspace, newUserInput: "-1,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1567890,
                nextUserInput: "-1,567,890",
                nextSelection: {start: 2}
            });

            expect(getNextNumericInputFieldState(
                "-1,567,890",
                {start: 2},
                {keypress: Keypress.Backspace, newUserInput: "-,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -567890,
                nextUserInput: "-567,890",
                nextSelection: {start: 1}
            });
        });
    });
});

describe("put caret at the beginning then press 'delete' continuously", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: ",234,567,890"}
        )).toEqual({
            nextValue: 234567890,
            nextUserInput: "234,567,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "234,567,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "34,567,890"}
        )).toEqual({
            nextValue: 34567890,
            nextUserInput: "34,567,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "34,567,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "4,567,890"}
        )).toEqual({
            nextValue: 4567890,
            nextUserInput: "4,567,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "4,567,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: ",567,890"}
        )).toEqual({
            nextValue: 567890,
            nextUserInput: "567,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "567,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "67,890"}
        )).toEqual({
            nextValue: 67890,
            nextUserInput: "67,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "67,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "7,890"}
        )).toEqual({
            nextValue: 7890,
            nextUserInput: "7,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "7,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: ",890"}
        )).toEqual({
            nextValue: 890,
            nextUserInput: "890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "90"}
        )).toEqual({
            nextValue: 90,
            nextUserInput: "90",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "90",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "0"}
        )).toEqual({
            nextValue: 0,
            nextUserInput: "0",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "0",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: ""}
        )).toEqual({
            nextValue: NaN,
            nextUserInput: "",
            nextSelection: {start: 0}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "1,234,567,890"},
            true
        )).toEqual({
            nextValue: 234567890,
            nextUserInput: "+234,567,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+234,567,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "234,567,890"},
            true
        )).toEqual({
            nextValue: 34567890,
            nextUserInput: "+34,567,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+34,567,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "34,567,890"},
            true
        )).toEqual({
            nextValue: 4567890,
            nextUserInput: "+4,567,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+4,567,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "4,567,890"},
            true
        )).toEqual({
            nextValue: 567890,
            nextUserInput: "+567,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+567,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "567,890"},
            true
        )).toEqual({
            nextValue: 67890,
            nextUserInput: "+67,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+67,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "67,890"},
            true
        )).toEqual({
            nextValue: 7890,
            nextUserInput: "+7,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+7,890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "7,890"},
            true
        )).toEqual({
            nextValue: 890,
            nextUserInput: "+890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+890",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "890"},
            true
        )).toEqual({
            nextValue: 90,
            nextUserInput: "+90",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+90",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "90"},
            true
        )).toEqual({
            nextValue: 0,
            nextUserInput: "+0",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+0",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "0"},
            true
        )).toEqual({
            nextValue: NaN,
            nextUserInput: "",
            nextSelection: {start: 0}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 0},
                {keypress: Keypress.Delete, newUserInput: "1,234,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -234567890,
                nextUserInput: "-234,567,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-234,567,890",
                {start: 0},
                {keypress: Keypress.Delete, newUserInput: "234,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -34567890,
                nextUserInput: "-34,567,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-34,567,890",
                {start: 0},
                {keypress: Keypress.Delete, newUserInput: "34,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -4567890,
                nextUserInput: "-4,567,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-4,567,890",
                {start: 0},
                {keypress: Keypress.Delete, newUserInput: "4,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -567890,
                nextUserInput: "-567,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-567,890",
                {start: 0},
                {keypress: Keypress.Delete, newUserInput: "567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -67890,
                nextUserInput: "-67,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-67,890",
                {start: 0},
                {keypress: Keypress.Delete, newUserInput: "67,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -7890,
                nextUserInput: "-7,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-7,890",
                {start: 0},
                {keypress: Keypress.Delete, newUserInput: "7,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -890,
                nextUserInput: "-890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-890",
                {start: 0},
                {keypress: Keypress.Delete, newUserInput: "890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -90,
                nextUserInput: "-90",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-90",
                {start: 0},
                {keypress: Keypress.Delete, newUserInput: "90"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: 0,
                nextUserInput: "-0",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-0",
                {start: 0},
                {keypress: Keypress.Delete, newUserInput: "0"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: 0,
                nextUserInput: "-",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-",
                {start: 0},
                {keypress: Keypress.Delete, newUserInput: ""},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: NaN,
                nextUserInput: "",
                nextSelection: {start: 0}
            });
        });
    });
});

describe("put caret in the middle then press 'delete' continuously", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 7},
            {keypress: Keypress.Delete, newUserInput: "1,234,57,890"}
        )).toEqual({
            nextValue: 123457890,
            nextUserInput: "123,457,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "123,457,890",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "123,45,890"}
        )).toEqual({
            nextValue: 12345890,
            nextUserInput: "12,345,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "12,345,890",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "12,345890"}
        )).toEqual({
            nextValue: 1234590,
            nextUserInput: "1,234,590",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "1,234,590",
            {start: 7},
            {keypress: Keypress.Delete, newUserInput: "1,234,50"}
        )).toEqual({
            nextValue: 123450,
            nextUserInput: "123,450",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "123,450",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "123,45"}
        )).toEqual({
            nextValue: 12345,
            nextUserInput: "12,345",
            nextSelection: {start: 6}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 8},
            {keypress: Keypress.Delete, newUserInput: "+1,234,57,890"},
            true
        )).toEqual({
            nextValue: 123457890,
            nextUserInput: "+123,457,890",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "+123,457,890",
            {start: 7},
            {keypress: Keypress.Delete, newUserInput: "+123,45,890"},
            true
        )).toEqual({
            nextValue: 12345890,
            nextUserInput: "+12,345,890",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "+12,345,890",
            {start: 7},
            {keypress: Keypress.Delete, newUserInput: "+12,345890"},
            true
        )).toEqual({
            nextValue: 1234590,
            nextUserInput: "+1,234,590",
            nextSelection: {start: 8}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,590",
            {start: 8},
            {keypress: Keypress.Delete, newUserInput: "+1,234,50"},
            true
        )).toEqual({
            nextValue: 123450,
            nextUserInput: "+123,450",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "+123,450",
            {start: 7},
            {keypress: Keypress.Delete, newUserInput: "+123,45"},
            true
        )).toEqual({
            nextValue: 12345,
            nextUserInput: "+12,345",
            nextSelection: {start: 7}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 8},
                {keypress: Keypress.Delete, newUserInput: "-1,234,57,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123457890,
                nextUserInput: "-123,457,890",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "-123,457,890",
                {start: 7},
                {keypress: Keypress.Delete, newUserInput: "-123,45,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12345890,
                nextUserInput: "-12,345,890",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "-12,345,890",
                {start: 7},
                {keypress: Keypress.Delete, newUserInput: "-12,345890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234590,
                nextUserInput: "-1,234,590",
                nextSelection: {start: 8}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,590",
                {start: 8},
                {keypress: Keypress.Delete, newUserInput: "-1,234,50"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123450,
                nextUserInput: "-123,450",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "-123,450",
                {start: 7},
                {keypress: Keypress.Delete, newUserInput: "-123,45"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12345,
                nextUserInput: "-12,345",
                nextSelection: {start: 7}
            });
        });
    });
});

describe("put caret before comma then press 'delete' continuously", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "1,234567,890"}
        )).toEqual({
            nextValue: 123467890,
            nextUserInput: "123,467,890",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "123,467,890",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "123,47,890"}
        )).toEqual({
            nextValue: 12347890,
            nextUserInput: "12,347,890",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "12,347,890",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "12,34,890"}
        )).toEqual({
            nextValue: 1234890,
            nextUserInput: "1,234,890",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "1,234,890",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "1,234890"}
        )).toEqual({
            nextValue: 123490,
            nextUserInput: "123,490",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "123,490",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "123,40"}
        )).toEqual({
            nextValue: 12340,
            nextUserInput: "12,340",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "12,340",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "12,34"}
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "1,234",
            nextSelection: {start: 5}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+1,234567,890"},
            true
        )).toEqual({
            nextValue: 123467890,
            nextUserInput: "+123,467,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+123,467,890",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+123,47,890"},
            true
        )).toEqual({
            nextValue: 12347890,
            nextUserInput: "+12,347,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+12,347,890",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+12,34,890"},
            true
        )).toEqual({
            nextValue: 1234890,
            nextUserInput: "+1,234,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,890",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+1,234890"},
            true
        )).toEqual({
            nextValue: 123490,
            nextUserInput: "+123,490",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+123,490",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+123,40"},
            true
        )).toEqual({
            nextValue: 12340,
            nextUserInput: "+12,340",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+12,340",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+12,34"},
            true
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "+1,234",
            nextSelection: {start: 6}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-1,234567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123467890,
                nextUserInput: "-123,467,890",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-123,467,890",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-123,47,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12347890,
                nextUserInput: "-12,347,890",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-12,347,890",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-12,34,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234890,
                nextUserInput: "-1,234,890",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,890",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-1,234890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123490,
                nextUserInput: "-123,490",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-123,490",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-123,40"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12340,
                nextUserInput: "-12,340",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-12,340",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-12,34"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234,
                nextUserInput: "-1,234",
                nextSelection: {start: 6}
            });
        });
    });
});

describe("put caret after comma then press 'delete' continuously", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "1,234,67,890"}
        )).toEqual({
            nextValue: 123467890,
            nextUserInput: "123,467,890",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "123,467,890",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "123,47,890"}
        )).toEqual({
            nextValue: 12347890,
            nextUserInput: "12,347,890",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "12,347,890",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "12,34,890"}
        )).toEqual({
            nextValue: 1234890,
            nextUserInput: "1,234,890",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "1,234,890",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "1,234890"}
        )).toEqual({
            nextValue: 123490,
            nextUserInput: "123,490",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "123,490",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "123,40"}
        )).toEqual({
            nextValue: 12340,
            nextUserInput: "12,340",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "12,340",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "12,34"}
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "1,234",
            nextSelection: {start: 5}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 7},
            {keypress: Keypress.Delete, newUserInput: "+1,234,67,890"},
            true
        )).toEqual({
            nextValue: 123467890,
            nextUserInput: "+123,467,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+123,467,890",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+123,47,890"},
            true
        )).toEqual({
            nextValue: 12347890,
            nextUserInput: "+12,347,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+12,347,890",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+12,34,890"},
            true
        )).toEqual({
            nextValue: 1234890,
            nextUserInput: "+1,234,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,890",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+1,234890"},
            true
        )).toEqual({
            nextValue: 123490,
            nextUserInput: "+123,490",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+123,490",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+123,40"},
            true
        )).toEqual({
            nextValue: 12340,
            nextUserInput: "+12,340",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+12,340",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+12,34"},
            true
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "+1,234",
            nextSelection: {start: 6}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 7},
                {keypress: Keypress.Delete, newUserInput: "-1,234,67,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123467890,
                nextUserInput: "-123,467,890",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-123,467,890",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-123,47,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12347890,
                nextUserInput: "-12,347,890",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-12,347,890",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-12,34,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234890,
                nextUserInput: "-1,234,890",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,890",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-1,234890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123490,
                nextUserInput: "-123,490",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-123,490",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-123,40"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12340,
                nextUserInput: "-12,340",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-12,340",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-12,34"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234,
                nextUserInput: "-1,234",
                nextSelection: {start: 6}
            });
        });
    });
});

describe("put caret at the beginning then press dot (.)", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 0},
            {keypress: Keypress.Dot, newUserInput: ".1,234,567,890"}
        )).toEqual({
            nextValue: 0.123456789,
            nextUserInput: "0.123456789",
            nextSelection: {start: 2}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 0},
            {keypress: Keypress.Dot, newUserInput: ".+1,234,567,890"},
            true
        )).toEqual({
            nextValue: 0.123456789,
            nextUserInput: "+0.123456789",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 1},
            {keypress: Keypress.Dot, newUserInput: "+.1,234,567,890"},
            true
        )).toEqual({
            nextValue: 0.123456789,
            nextUserInput: "+0.123456789",
            nextSelection: {start: 3}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 0},
                {keypress: Keypress.Dot, newUserInput: ".-1,234,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -0.123456789,
                nextUserInput: "-0.123456789",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 1},
                {keypress: Keypress.Dot, newUserInput: "-.1,234,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -0.123456789,
                nextUserInput: "-0.123456789",
                nextSelection: {start: 3}
            });
        });
    });
});

describe("put caret in the middle then press dot (.)", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 4},
            {keypress: Keypress.Dot, newUserInput: "1,23.4,567,890"}
        )).toEqual({
            nextValue: 123.456789,
            nextUserInput: "123.456789",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 7},
            {keypress: Keypress.Dot, newUserInput: "1,234,5.67,890"}
        )).toEqual({
            nextValue: 12345.6789,
            nextUserInput: "12,345.6789",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 11},
            {keypress: Keypress.Dot, newUserInput: "1,234,567,8.90"}
        )).toEqual({
            nextValue: 12345678.9,
            nextUserInput: "12,345,678.9",
            nextSelection: {start: 11}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 12},
            {keypress: Keypress.Dot, newUserInput: "1,234,567,89.0"}
        )).toEqual({
            nextValue: 123456789,
            nextUserInput: "123,456,789.0",
            nextSelection: {start: 12}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 5},
            {keypress: Keypress.Dot, newUserInput: "+1,23.4,567,890"},
            true
        )).toEqual({
            nextValue: 123.456789,
            nextUserInput: "+123.456789",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 8},
            {keypress: Keypress.Dot, newUserInput: "+1,234,5.67,890"},
            true
        )).toEqual({
            nextValue: 12345.6789,
            nextUserInput: "+12,345.6789",
            nextSelection: {start: 8}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 12},
            {keypress: Keypress.Dot, newUserInput: "+1,234,567,8.90"},
            true
        )).toEqual({
            nextValue: 12345678.9,
            nextUserInput: "+12,345,678.9",
            nextSelection: {start: 12}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 13},
            {keypress: Keypress.Dot, newUserInput: "+1,234,567,89.0"},
            true
        )).toEqual({
            nextValue: 123456789,
            nextUserInput: "+123,456,789.0",
            nextSelection: {start: 13}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 5},
                {keypress: Keypress.Dot, newUserInput: "-1,23.4,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123.456789,
                nextUserInput: "-123.456789",
                nextSelection: {start: 5}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 8},
                {keypress: Keypress.Dot, newUserInput: "-1,234,5.67,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12345.6789,
                nextUserInput: "-12,345.6789",
                nextSelection: {start: 8}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 12},
                {keypress: Keypress.Dot, newUserInput: "-1,234,567,8.90"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -12345678.9,
                nextUserInput: "-12,345,678.9",
                nextSelection: {start: 12}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 13},
                {keypress: Keypress.Dot, newUserInput: "-1,234,567,89.0"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123456789,
                nextUserInput: "-123,456,789.0",
                nextSelection: {start: 13}
            });
        });
    });
});

describe("put caret before comma then press dot (.)", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 1},
            {keypress: Keypress.Dot, newUserInput: "1.,234,567,890"}
        )).toEqual({
            nextValue: 1.23456789,
            nextUserInput: "1.23456789",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 5},
            {keypress: Keypress.Dot, newUserInput: "1,234.,567,890"}
        )).toEqual({
            nextValue: 1234.56789,
            nextUserInput: "1,234.56789",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 9},
            {keypress: Keypress.Dot, newUserInput: "1,234,567.,890"}
        )).toEqual({
            nextValue: 1234567.89,
            nextUserInput: "1,234,567.89",
            nextSelection: {start: 10}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 2},
            {keypress: Keypress.Dot, newUserInput: "+1.,234,567,890"},
            true
        )).toEqual({
            nextValue: 1.23456789,
            nextUserInput: "+1.23456789",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 6},
            {keypress: Keypress.Dot, newUserInput: "+1,234.,567,890"},
            true
        )).toEqual({
            nextValue: 1234.56789,
            nextUserInput: "+1,234.56789",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 10},
            {keypress: Keypress.Dot, newUserInput: "+1,234,567.,890"},
            true
        )).toEqual({
            nextValue: 1234567.89,
            nextUserInput: "+1,234,567.89",
            nextSelection: {start: 11}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 2},
                {keypress: Keypress.Dot, newUserInput: "-1.,234,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1.23456789,
                nextUserInput: "-1.23456789",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 6},
                {keypress: Keypress.Dot, newUserInput: "-1,234.,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56789,
                nextUserInput: "-1,234.56789",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 10},
                {keypress: Keypress.Dot, newUserInput: "-1,234,567.,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567.89,
                nextUserInput: "-1,234,567.89",
                nextSelection: {start: 11}
            });
        });
    });
});

describe("put caret after comma then press dot (.)", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 2},
            {keypress: Keypress.Dot, newUserInput: "1,.234,567,890"}
        )).toEqual({
            nextValue: 1.23456789,
            nextUserInput: "1.23456789",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 6},
            {keypress: Keypress.Dot, newUserInput: "1,234,.567,890"}
        )).toEqual({
            nextValue: 1234.56789,
            nextUserInput: "1,234.56789",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 10},
            {keypress: Keypress.Dot, newUserInput: "1,234,567,.890"}
        )).toEqual({
            nextValue: 1234567.89,
            nextUserInput: "1,234,567.89",
            nextSelection: {start: 10}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 3},
            {keypress: Keypress.Dot, newUserInput: "+1,.234,567,890"},
            true
        )).toEqual({
            nextValue: 1.23456789,
            nextUserInput: "+1.23456789",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 7},
            {keypress: Keypress.Dot, newUserInput: "+1,234,.567,890"},
            true
        )).toEqual({
            nextValue: 1234.56789,
            nextUserInput: "+1,234.56789",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 11},
            {keypress: Keypress.Dot, newUserInput: "+1,234,567,.890"},
            true
        )).toEqual({
            nextValue: 1234567.89,
            nextUserInput: "+1,234,567.89",
            nextSelection: {start: 11}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 3},
                {keypress: Keypress.Dot, newUserInput: "-1,.234,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1.23456789,
                nextUserInput: "-1.23456789",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 7},
                {keypress: Keypress.Dot, newUserInput: "-1,234,.567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56789,
                nextUserInput: "-1,234.56789",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 11},
                {keypress: Keypress.Dot, newUserInput: "-1,234,567,.890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567.89,
                nextUserInput: "-1,234,567.89",
                nextSelection: {start: 11}
            });
        });
    });
});

describe("put caret at the end then press dot (.)", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 13},
            {keypress: Keypress.Dot, newUserInput: "1,234,567,890."}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890.",
            nextSelection: {start: 14}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 14},
            {keypress: Keypress.Dot, newUserInput: "+1,234,567,890."},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890.",
            nextSelection: {start: 15}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 14},
                {keypress: Keypress.Dot, newUserInput: "-1,234,567,890."},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890.",
                nextSelection: {start: 15}
            });
        });
    });
});

describe("backspace dot (.) symbol", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "12.3",
            {start: 3},
            {keypress: Keypress.Backspace, newUserInput: "123"}
        )).toEqual({
            nextValue: 123,
            nextUserInput: "123",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "123.4",
            {start: 4},
            {keypress: Keypress.Backspace, newUserInput: "1234"}
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "1,234",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234.567",
            {start: 6},
            {keypress: Keypress.Backspace, newUserInput: "1,234567"}
        )).toEqual({
            nextValue: 1234567,
            nextUserInput: "1,234,567",
            nextSelection: {start: 5}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+12.3",
            {start: 4},
            {keypress: Keypress.Backspace, newUserInput: "+123"},
            true
        )).toEqual({
            nextValue: 123,
            nextUserInput: "+123",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+123.4",
            {start: 5},
            {keypress: Keypress.Backspace, newUserInput: "+1234"},
            true
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "+1,234",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.567",
            {start: 7},
            {keypress: Keypress.Backspace, newUserInput: "+1,234567"},
            true
        )).toEqual({
            nextValue: 1234567,
            nextUserInput: "+1,234,567",
            nextSelection: {start: 6}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-12.3",
                {start: 4},
                {keypress: Keypress.Backspace, newUserInput: "-123"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123,
                nextUserInput: "-123",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-123.4",
                {start: 5},
                {keypress: Keypress.Backspace, newUserInput: "-1234"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234,
                nextUserInput: "-1,234",
                nextSelection: {start: 5}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.567",
                {start: 7},
                {keypress: Keypress.Backspace, newUserInput: "-1,234567"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567,
                nextUserInput: "-1,234,567",
                nextSelection: {start: 6}
            });
        });
    });
});

describe("delete dot (.) symbol", () =>
{
    it("works correctly when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "12.3",
            {start: 2},
            {keypress: Keypress.Delete, newUserInput: "123"}
        )).toEqual({
            nextValue: 123,
            nextUserInput: "123",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "123.4",
            {start: 3},
            {keypress: Keypress.Delete, newUserInput: "1234"}
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "1,234",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234.567",
            {start: 5},
            {keypress: Keypress.Delete, newUserInput: "1,234567"}
        )).toEqual({
            nextValue: 1234567,
            nextUserInput: "1,234,567",
            nextSelection: {start: 5}
        });
    });

    it("works correctly when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+12.3",
            {start: 3},
            {keypress: Keypress.Delete, newUserInput: "+123"},
            true
        )).toEqual({
            nextValue: 123,
            nextUserInput: "+123",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+123.4",
            {start: 4},
            {keypress: Keypress.Delete, newUserInput: "+1234"},
            true
        )).toEqual({
            nextValue: 1234,
            nextUserInput: "+1,234",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.567",
            {start: 6},
            {keypress: Keypress.Delete, newUserInput: "+1,234567"},
            true
        )).toEqual({
            nextValue: 1234567,
            nextUserInput: "+1,234,567",
            nextSelection: {start: 6}
        });
    });

    it("works correctly with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-12.3",
                {start: 3},
                {keypress: Keypress.Delete, newUserInput: "-123"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -123,
                nextUserInput: "-123",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-123.4",
                {start: 4},
                {keypress: Keypress.Delete, newUserInput: "-1234"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234,
                nextUserInput: "-1,234",
                nextSelection: {start: 5}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.567",
                {start: 6},
                {keypress: Keypress.Delete, newUserInput: "-1,234567"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567,
                nextUserInput: "-1,234,567",
                nextSelection: {start: 6}
            });
        });
    });
});

describe("enter not supported characters", () =>
{
    const notSupportedCharacters: string[] = [];
    for (let asciiCode = 32; asciiCode < 127; asciiCode++)
    {
        const character = String.fromCharCode(asciiCode);
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"].includes(character))
        {
            continue;
        }

        notSupportedCharacters.push(character);
    }

    it("ignores not supported characters when not explicitly showing plus (+) symbol", () =>
    {
        notSupportedCharacters.forEach(char =>
        {
            expect(getNextNumericInputFieldState(
                "",
                {start: 0},
                {keypress: Keypress.NotSupported, newUserInput: `${char}`}
            )).toEqual({
                nextValue: NaN,
                nextUserInput: "",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 0},
                {keypress: Keypress.NotSupported, newUserInput: `${char}1,234,567,890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 1},
                {keypress: Keypress.NotSupported, newUserInput: `1${char},234,567,890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 1}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 2},
                {keypress: Keypress.NotSupported, newUserInput: `1,${char}234,567,890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 2}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 3},
                {keypress: Keypress.NotSupported, newUserInput: `1,2${char}34,567,890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 4},
                {keypress: Keypress.NotSupported, newUserInput: `1,23${char}4,567,890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 4}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 5},
                {keypress: Keypress.NotSupported, newUserInput: `1,234${char},567,890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 5}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 6},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,${char}567,890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 7},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,5${char}67,890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 8},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,56${char}7,890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 8}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 9},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,567${char},890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 9}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 10},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,567,${char}890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 10}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 11},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,567,8${char}90`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 11}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 12},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,567,89${char}0`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 12}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 13},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,567,890${char}`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 13}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890.12",
                {start: 13},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,567,890${char}.12`}
            )).toEqual({
                nextValue: 1234567890.12,
                nextUserInput: "1,234,567,890.12",
                nextSelection: {start: 13}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890.12",
                {start: 14},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,567,890.${char}12`}
            )).toEqual({
                nextValue: 1234567890.12,
                nextUserInput: "1,234,567,890.12",
                nextSelection: {start: 14}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890.12",
                {start: 15},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,567,890.1${char}2`}
            )).toEqual({
                nextValue: 1234567890.12,
                nextUserInput: "1,234,567,890.12",
                nextSelection: {start: 15}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890.12",
                {start: 16},
                {keypress: Keypress.NotSupported, newUserInput: `1,234,567,890.12${char}`}
            )).toEqual({
                nextValue: 1234567890.12,
                nextUserInput: "1,234,567,890.12",
                nextSelection: {start: 16}
            });
        });
    });

    it("ignores not supported characters when explicitly showing plus (+) symbol", () =>
    {
        notSupportedCharacters.forEach(char =>
        {
            expect(getNextNumericInputFieldState(
                "",
                {start: 0},
                {keypress: Keypress.NotSupported, newUserInput: `${char}`},
                true
            )).toEqual({
                nextValue: NaN,
                nextUserInput: "",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 0},
                {keypress: Keypress.NotSupported, newUserInput: `${char}+1,234,567,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 1},
                {keypress: Keypress.NotSupported, newUserInput: `+${char}1,234,567,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 1}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 2},
                {keypress: Keypress.NotSupported, newUserInput: `+1${char},234,567,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 2}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 3},
                {keypress: Keypress.NotSupported, newUserInput: `+1,${char}234,567,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 4},
                {keypress: Keypress.NotSupported, newUserInput: `+1,2${char}34,567,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 4}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 5},
                {keypress: Keypress.NotSupported, newUserInput: `+1,23${char}4,567,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 5}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 6},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234${char},567,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 7},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,${char}567,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 8},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,5${char}67,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 8}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 9},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,56${char}7,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 9}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 10},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,567${char},890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 10}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 11},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,567,${char}890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 11}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 12},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,567,8${char}90`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 12}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 13},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,567,89${char}0`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 13}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 14},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,567,890${char}`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 14}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890.12",
                {start: 14},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,567,890${char}.12`},
                true
            )).toEqual({
                nextValue: 1234567890.12,
                nextUserInput: "+1,234,567,890.12",
                nextSelection: {start: 14}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890.12",
                {start: 15},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,567,890.${char}12`},
                true
            )).toEqual({
                nextValue: 1234567890.12,
                nextUserInput: "+1,234,567,890.12",
                nextSelection: {start: 15}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890.12",
                {start: 16},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,567,890.1${char}2`},
                true
            )).toEqual({
                nextValue: 1234567890.12,
                nextUserInput: "+1,234,567,890.12",
                nextSelection: {start: 16}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890.12",
                {start: 17},
                {keypress: Keypress.NotSupported, newUserInput: `+1,234,567,890.12${char}`},
                true
            )).toEqual({
                nextValue: 1234567890.12,
                nextUserInput: "+1,234,567,890.12",
                nextSelection: {start: 17}
            });
        });
    });

    it("ignores not supported characters when working with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            notSupportedCharacters.forEach(char =>
            {
                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 0},
                    {keypress: Keypress.NotSupported, newUserInput: `${char}-1,234,567,890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 0}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 1},
                    {keypress: Keypress.NotSupported, newUserInput: `-${char}1,234,567,890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 1}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 2},
                    {keypress: Keypress.NotSupported, newUserInput: `-1${char},234,567,890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 2}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 3},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,${char}234,567,890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 3}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 4},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,2${char}34,567,890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 4}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 5},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,23${char}4,567,890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 5}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 6},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234${char},567,890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 6}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 7},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,${char}567,890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 7}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 8},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,5${char}67,890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 8}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 9},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,56${char}7,890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 9}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 10},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,567${char},890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 10}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 11},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,567,${char}890`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 11}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 12},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,567,8${char}90`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 12}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 13},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,567,89${char}0`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 13}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890",
                    {start: 14},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,567,890${char}`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890,
                    nextUserInput: "-1,234,567,890",
                    nextSelection: {start: 14}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890.12",
                    {start: 14},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,567,890${char}.12`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890.12,
                    nextUserInput: "-1,234,567,890.12",
                    nextSelection: {start: 14}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890.12",
                    {start: 15},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,567,890.${char}12`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890.12,
                    nextUserInput: "-1,234,567,890.12",
                    nextSelection: {start: 15}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890.12",
                    {start: 16},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,567,890.1${char}2`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890.12,
                    nextUserInput: "-1,234,567,890.12",
                    nextSelection: {start: 16}
                });

                expect(getNextNumericInputFieldState(
                    "-1,234,567,890.12",
                    {start: 17},
                    {keypress: Keypress.NotSupported, newUserInput: `-1,234,567,890.12${char}`},
                    showPlusSymbolForPositiveNumber
                )).toEqual({
                    nextValue: -1234567890.12,
                    nextUserInput: "-1,234,567,890.12",
                    nextSelection: {start: 17}
                });
            });
        });
    });
});

describe("minus (-) symbol is only allowed at the left most position", () =>
{
    it("ignores invalid minus (-) symbol when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "",
            {start: 0},
            {keypress: Keypress.Minus, newUserInput: "-"}
        )).toEqual({
            nextValue: 0,
            nextUserInput: "-",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 0},
            {keypress: Keypress.Minus, newUserInput: "-1,234,567,890"}
        )).toEqual({
            nextValue: -1234567890,
            nextUserInput: "-1,234,567,890",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 1},
            {keypress: Keypress.Minus, newUserInput: "1-,234,567,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 2},
            {keypress: Keypress.Minus, newUserInput: "1,-234,567,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 3},
            {keypress: Keypress.Minus, newUserInput: "1,2-34,567,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 4},
            {keypress: Keypress.Minus, newUserInput: "1,23-4,567,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 5},
            {keypress: Keypress.Minus, newUserInput: "1,234-,567,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 6},
            {keypress: Keypress.Minus, newUserInput: "1,234,-567,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 7},
            {keypress: Keypress.Minus, newUserInput: "1,234,5-67,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 8},
            {keypress: Keypress.Minus, newUserInput: "1,234,56-7,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 8}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 9},
            {keypress: Keypress.Minus, newUserInput: "1,234,567-,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 9}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 10},
            {keypress: Keypress.Minus, newUserInput: "1,234,567,-890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 10}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 11},
            {keypress: Keypress.Minus, newUserInput: "1,234,567,8-90"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 11}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 12},
            {keypress: Keypress.Minus, newUserInput: "1,234,567,89-0"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 12}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 13},
            {keypress: Keypress.Minus, newUserInput: "1,234,567,890-"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 13}
        });
    });

    it("ignores invalid minus (-) symbol when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "",
            {start: 0},
            {keypress: Keypress.Minus, newUserInput: "-"},
            true
        )).toEqual({
            nextValue: 0,
            nextUserInput: "-",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 0},
            {keypress: Keypress.Minus, newUserInput: "-+1,234,567,890"},
            true
        )).toEqual({
            nextValue: -1234567890,
            nextUserInput: "-1,234,567,890",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 1},
            {keypress: Keypress.Minus, newUserInput: "+-1,234,567,890"},
            true
        )).toEqual({
            nextValue: -1234567890,
            nextUserInput: "-1,234,567,890",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 2},
            {keypress: Keypress.Minus, newUserInput: "+1-,234,567,890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 3},
            {keypress: Keypress.Minus, newUserInput: "+1,-234,567,890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 4},
            {keypress: Keypress.Minus, newUserInput: "+1,2-34,567,890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 5},
            {keypress: Keypress.Minus, newUserInput: "+1,23-4,567,890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 6},
            {keypress: Keypress.Minus, newUserInput: "+1,234-,567,890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 7},
            {keypress: Keypress.Minus, newUserInput: "+1,234,-567,890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 8},
            {keypress: Keypress.Minus, newUserInput: "+1,234,5-67,890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 8}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 9},
            {keypress: Keypress.Minus, newUserInput: "+1,234,56-7,890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 9}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 10},
            {keypress: Keypress.Minus, newUserInput: "+1,234,567-,890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 10}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 11},
            {keypress: Keypress.Minus, newUserInput: "+1,234,567,-890"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 11}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 12},
            {keypress: Keypress.Minus, newUserInput: "+1,234,567,8-90"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 12}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 13},
            {keypress: Keypress.Minus, newUserInput: "+1,234,567,89-0"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 13}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 14},
            {keypress: Keypress.Minus, newUserInput: "+1,234,567,890-"},
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 14}
        });
    });

    it("ignores invalid minus (-) symbol when working with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 0},
                {keypress: Keypress.Minus, newUserInput: "--1,234,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 1},
                {keypress: Keypress.Minus, newUserInput: "--1,234,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 1}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 2},
                {keypress: Keypress.Minus, newUserInput: "-1-,234,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 2}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 3},
                {keypress: Keypress.Minus, newUserInput: "-1,-234,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 4},
                {keypress: Keypress.Minus, newUserInput: "-1,2-34,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 4}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 5},
                {keypress: Keypress.Minus, newUserInput: "-1,23-4,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 5}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 6},
                {keypress: Keypress.Minus, newUserInput: "-1,234-,567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 7},
                {keypress: Keypress.Minus, newUserInput: "-1,234,-567,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 8},
                {keypress: Keypress.Minus, newUserInput: "-1,234,5-67,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 8}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 9},
                {keypress: Keypress.Minus, newUserInput: "-1,234,56-7,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 9}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 10},
                {keypress: Keypress.Minus, newUserInput: "-1,234,567-,890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 10}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 11},
                {keypress: Keypress.Minus, newUserInput: "-1,234,567,-890"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 11}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 12},
                {keypress: Keypress.Minus, newUserInput: "-1,234,567,8-90"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 12}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 13},
                {keypress: Keypress.Minus, newUserInput: "-1,234,567,89-0"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 13}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 14},
                {keypress: Keypress.Minus, newUserInput: "-1,234,567,890-"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 14}
            });
        });
    });
});

describe("only 1 dot (.) symbol is allowed", () =>
{
    it("ignores invalid dot (.) symbol when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234.56",
            {start: 0},
            {keypress: Keypress.Dot, newUserInput: ".1,234.56"}
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "1,234.56",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "1,234.56",
            {start: 1},
            {keypress: Keypress.Dot, newUserInput: "1.,234.56"}
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "1,234.56",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "1,234.56",
            {start: 2},
            {keypress: Keypress.Dot, newUserInput: "1,.234.56"}
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "1,234.56",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "1,234.56",
            {start: 3},
            {keypress: Keypress.Dot, newUserInput: "1,2.34.56"}
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "1,234.56",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "1,234.56",
            {start: 4},
            {keypress: Keypress.Dot, newUserInput: "1,23.4.56"}
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "1,234.56",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234.56",
            {start: 5},
            {keypress: Keypress.Dot, newUserInput: "1,234..56"}
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "1,234.56",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "1,234.56",
            {start: 6},
            {keypress: Keypress.Dot, newUserInput: "1,234..56"}
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "1,234.56",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "1,234.56",
            {start: 7},
            {keypress: Keypress.Dot, newUserInput: "1,234.5.6"}
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "1,234.56",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "1,234.56",
            {start: 8},
            {keypress: Keypress.Dot, newUserInput: "1,234.56."}
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "1,234.56",
            nextSelection: {start: 8}
        });
    });

    it("ignores invalid dot (.) symbol when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234.56",
            {start: 0},
            {keypress: Keypress.Dot, newUserInput: ".+1,234.56"},
            true
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "+1,234.56",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.56",
            {start: 1},
            {keypress: Keypress.Dot, newUserInput: "+.1,234.56"},
            true
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "+1,234.56",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.56",
            {start: 2},
            {keypress: Keypress.Dot, newUserInput: "+1.,234.56"},
            true
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "+1,234.56",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.56",
            {start: 3},
            {keypress: Keypress.Dot, newUserInput: "+1,.234.56"},
            true
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "+1,234.56",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.56",
            {start: 4},
            {keypress: Keypress.Dot, newUserInput: "+1,2.34.56"},
            true
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "+1,234.56",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.56",
            {start: 5},
            {keypress: Keypress.Dot, newUserInput: "+1,23.4.56"},
            true
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "+1,234.56",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.56",
            {start: 6},
            {keypress: Keypress.Dot, newUserInput: "+1,234..56"},
            true
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "+1,234.56",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.56",
            {start: 7},
            {keypress: Keypress.Dot, newUserInput: "+1,234..56"},
            true
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "+1,234.56",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.56",
            {start: 8},
            {keypress: Keypress.Dot, newUserInput: "+1,234.5.6"},
            true
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "+1,234.56",
            nextSelection: {start: 8}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.56",
            {start: 9},
            {keypress: Keypress.Dot, newUserInput: "+1,234.56."},
            true
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "+1,234.56",
            nextSelection: {start: 9}
        });
    });

    it("ignores invalid dot (.) symbol when working with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234.56",
                {start: 0},
                {keypress: Keypress.Dot, newUserInput: ".-1,234.56"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56,
                nextUserInput: "-1,234.56",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.56",
                {start: 1},
                {keypress: Keypress.Dot, newUserInput: "-.1,234.56"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56,
                nextUserInput: "-1,234.56",
                nextSelection: {start: 1}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.56",
                {start: 2},
                {keypress: Keypress.Dot, newUserInput: "-1.,234.56"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56,
                nextUserInput: "-1,234.56",
                nextSelection: {start: 2}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.56",
                {start: 3},
                {keypress: Keypress.Dot, newUserInput: "-1,.234.56"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56,
                nextUserInput: "-1,234.56",
                nextSelection: {start: 3}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.56",
                {start: 4},
                {keypress: Keypress.Dot, newUserInput: "-1,2.34.56"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56,
                nextUserInput: "-1,234.56",
                nextSelection: {start: 4}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.56",
                {start: 5},
                {keypress: Keypress.Dot, newUserInput: "-1,23.4.56"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56,
                nextUserInput: "-1,234.56",
                nextSelection: {start: 5}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.56",
                {start: 6},
                {keypress: Keypress.Dot, newUserInput: "-1,234..56"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56,
                nextUserInput: "-1,234.56",
                nextSelection: {start: 6}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.56",
                {start: 7},
                {keypress: Keypress.Dot, newUserInput: "-1,234..56"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56,
                nextUserInput: "-1,234.56",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.56",
                {start: 8},
                {keypress: Keypress.Dot, newUserInput: "-1,234.5.6"},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56,
                nextUserInput: "-1,234.56",
                nextSelection: {start: 8}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.56",
                {start: 9},
                {keypress: Keypress.Dot, newUserInput: "-1,234.56."},
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234.56,
                nextUserInput: "-1,234.56",
                nextSelection: {start: 9}
            });
        });
    });
});

describe("minus (-) symbol is not allowed when 'minValue' is greater than or equal to 0", () =>
{
    it("ignores minus (-) symbol when not explicitly showing plus (+) symbol", () =>
    {
        [0, 1].forEach(minValue =>
        {
            expect(getNextNumericInputFieldState(
                "",
                {start: 0},
                {keypress: Keypress.Minus, newUserInput: "-"},
                false,
                undefined,
                minValue
            )).toEqual({
                nextValue: NaN,
                nextUserInput: "",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "1",
                {start: 0},
                {keypress: Keypress.Minus, newUserInput: "-1"},
                false,
                undefined,
                minValue
            )).toEqual({
                nextValue: 1,
                nextUserInput: "1",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "1,234",
                {start: 0},
                {keypress: Keypress.Minus, newUserInput: "-1,234"},
                false,
                undefined,
                minValue
            )).toEqual({
                nextValue: 1234,
                nextUserInput: "1,234",
                nextSelection: {start: 0}
            });
        });
    });

    it("ignores minus (-) symbol when explicitly showing plus (+) symbol", () =>
    {
        [0, 1].forEach(minValue =>
        {
            expect(getNextNumericInputFieldState(
                "",
                {start: 0},
                {keypress: Keypress.Minus, newUserInput: "-"},
                true,
                undefined,
                minValue
            )).toEqual({
                nextValue: NaN,
                nextUserInput: "",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "+1",
                {start: 0},
                {keypress: Keypress.Minus, newUserInput: "-+1"},
                true,
                undefined,
                minValue
            )).toEqual({
                nextValue: 1,
                nextUserInput: "+1",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "+1",
                {start: 1},
                {keypress: Keypress.Minus, newUserInput: "+-1"},
                true,
                undefined,
                minValue
            )).toEqual({
                nextValue: 1,
                nextUserInput: "+1",
                nextSelection: {start: 1}
            });

            expect(getNextNumericInputFieldState(
                "+1,234",
                {start: 1},
                {keypress: Keypress.Minus, newUserInput: "+-1,234"},
                true,
                undefined,
                minValue
            )).toEqual({
                nextValue: 1234,
                nextUserInput: "+1,234",
                nextSelection: {start: 1}
            });
        });
    });
});

describe("dot (.) symbol is not allowed when 'maximumFractionDigitCount' is equal to 0", () =>
{
    it("ignores dot (.) symbol when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "",
            {start: 0},
            {keypress: Keypress.Dot, newUserInput: "."},
            false,
            undefined,
            undefined,
            undefined,
            0
        )).toEqual({
            nextValue: NaN,
            nextUserInput: "",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 0},
            {keypress: Keypress.Dot, newUserInput: ".1,234,567,890"},
            false,
            undefined,
            undefined,
            undefined,
            0
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 7},
            {keypress: Keypress.Dot, newUserInput: "1,234,5.67,890"},
            false,
            undefined,
            undefined,
            undefined,
            0
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 13},
            {keypress: Keypress.Dot, newUserInput: "1,234,567,890."},
            false,
            undefined,
            undefined,
            undefined,
            0
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 13}
        });
    });

    it("ignores dot (.) symbol when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "",
            {start: 0},
            {keypress: Keypress.Dot, newUserInput: "."},
            true,
            undefined,
            undefined,
            undefined,
            0
        )).toEqual({
            nextValue: NaN,
            nextUserInput: "",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 0},
            {keypress: Keypress.Dot, newUserInput: ".+1,234,567,890"},
            true,
            undefined,
            undefined,
            undefined,
            0
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 1},
            {keypress: Keypress.Dot, newUserInput: "+.1,234,567,890"},
            true,
            undefined,
            undefined,
            undefined,
            0
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 8},
            {keypress: Keypress.Dot, newUserInput: "+1,234,5.67,890"},
            true,
            undefined,
            undefined,
            undefined,
            0
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 8}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 14},
            {keypress: Keypress.Dot, newUserInput: "+1,234,567,890."},
            true,
            undefined,
            undefined,
            undefined,
            0
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 14}
        });
    });

    it("ignores dot (.) symbol when working with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 0},
                {keypress: Keypress.Dot, newUserInput: ".-1,234,567,890"},
                showPlusSymbolForPositiveNumber,
                undefined,
                undefined,
                undefined,
                0
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 1},
                {keypress: Keypress.Dot, newUserInput: "-.1,234,567,890"},
                showPlusSymbolForPositiveNumber,
                undefined,
                undefined,
                undefined,
                0
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 1}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 8},
                {keypress: Keypress.Dot, newUserInput: "-1,234,5.67,890"},
                showPlusSymbolForPositiveNumber,
                undefined,
                undefined,
                undefined,
                0
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 8}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 14},
                {keypress: Keypress.Dot, newUserInput: "-1,234,567,890."},
                showPlusSymbolForPositiveNumber,
                undefined,
                undefined,
                undefined,
                0
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 14}
            });
        });
    });
});

describe("the number of digits cannot be greater than 'maximumDigitCount'", () =>
{
    it("ignores redundant digits when not explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "123,456",
            {start: 7},
            {keypress: Keypress.Digit, newUserInput: "123,4567"},
            false,
            undefined,
            undefined,
            undefined,
            undefined,
            6
        )).toEqual({
            nextValue: 123456,
            nextUserInput: "123,456",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "1,234.56",
            {start: 8},
            {keypress: Keypress.Digit, newUserInput: "1,234.567"},
            false,
            undefined,
            undefined,
            undefined,
            undefined,
            6
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "1,234.56",
            nextSelection: {start: 8}
        });
    });

    it("ignores redundant digits when explicitly showing plus (+) symbol", () =>
    {
        expect(getNextNumericInputFieldState(
            "+123,456",
            {start: 8},
            {keypress: Keypress.Digit, newUserInput: "+123,4567"},
            true,
            undefined,
            undefined,
            undefined,
            undefined,
            6
        )).toEqual({
            nextValue: 123456,
            nextUserInput: "+123,456",
            nextSelection: {start: 8}
        });

        expect(getNextNumericInputFieldState(
            "+1,234.56",
            {start: 9},
            {keypress: Keypress.Digit, newUserInput: "+1,234.567"},
            true,
            undefined,
            undefined,
            undefined,
            undefined,
            6
        )).toEqual({
            nextValue: 1234.56,
            nextUserInput: "+1,234.56",
            nextSelection: {start: 9}
        });
    });

    it("ignores redundant digits when working with negative number", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-123,456",
                {start: 8},
                {keypress: Keypress.Digit, newUserInput: "-123,4567"},
                showPlusSymbolForPositiveNumber,
                undefined,
                undefined,
                undefined,
                undefined,
                6
            )).toEqual({
                nextValue: -123456,
                nextUserInput: "-123,456",
                nextSelection: {start: 8}
            });

            expect(getNextNumericInputFieldState(
                "-1,234.56",
                {start: 9},
                {keypress: Keypress.Digit, newUserInput: "-1,234.567"},
                showPlusSymbolForPositiveNumber,
                undefined,
                undefined,
                undefined,
                undefined,
                6
            )).toEqual({
                nextValue: -1234.56,
                nextUserInput: "-1,234.56",
                nextSelection: {start: 9}
            });
        });
    });
});

test("backspace does nothing when caret is at the left most position", () =>
{
    expect(getNextNumericInputFieldState(
        "1,234,567,890",
        {start: 0},
        {keypress: Keypress.Backspace, newUserInput: "1,234,567,890"}
    )).toEqual({
        nextValue: 1234567890,
        nextUserInput: "1,234,567,890",
        nextSelection: {start: 0}
    });

    expect(getNextNumericInputFieldState(
        "+1,234,567,890",
        {start: 0},
        {keypress: Keypress.Backspace, newUserInput: "+1,234,567,890"},
        true
    )).toEqual({
        nextValue: 1234567890,
        nextUserInput: "+1,234,567,890",
        nextSelection: {start: 0}
    });

    [true, false].forEach(showPlusSymbolForPositiveNumber =>
    {
        expect(getNextNumericInputFieldState(
            "-1,234,567,890",
            {start: 0},
            {keypress: Keypress.Backspace, newUserInput: "-1,234,567,890"},
            showPlusSymbolForPositiveNumber
        )).toEqual({
            nextValue: -1234567890,
            nextUserInput: "-1,234,567,890",
            nextSelection: {start: 0}
        });
    });
});

test("delete does nothing when caret is at the right most position", () =>
{
    expect(getNextNumericInputFieldState(
        "1,234,567,890",
        {start: 13},
        {keypress: Keypress.Delete, newUserInput: "1,234,567,890"}
    )).toEqual({
        nextValue: 1234567890,
        nextUserInput: "1,234,567,890",
        nextSelection: {start: 13}
    });

    expect(getNextNumericInputFieldState(
        "+1,234,567,890",
        {start: 14},
        {keypress: Keypress.Delete, newUserInput: "+1,234,567,890"},
        true
    )).toEqual({
        nextValue: 1234567890,
        nextUserInput: "+1,234,567,890",
        nextSelection: {start: 14}
    });

    [true, false].forEach(showPlusSymbolForPositiveNumber =>
    {
        expect(getNextNumericInputFieldState(
            "-1,234,567,890",
            {start: 14},
            {keypress: Keypress.Delete, newUserInput: "-1,234,567,890"},
            showPlusSymbolForPositiveNumber
        )).toEqual({
            nextValue: -1234567890,
            nextUserInput: "-1,234,567,890",
            nextSelection: {start: 14}
        });
    });
});

test("entering digit before plus (+) symbol works correctly", () =>
{
    expect(getNextNumericInputFieldState(
        "+4,321",
        {start: 0},
        {keypress: Keypress.Digit, newUserInput: "5+4,321"},
        true
    )).toEqual({
        nextValue: 54321,
        nextUserInput: "+54,321",
        nextSelection: {start: 2}
    });
});

test("entering digit before minus (-) symbol works correctly", () =>
{
    [true, false].forEach(showPlusSymbolForPositiveNumber =>
    {
        expect(getNextNumericInputFieldState(
            "-4,321",
            {start: 0},
            {keypress: Keypress.Digit, newUserInput: "5-4,321"},
            showPlusSymbolForPositiveNumber
        )).toEqual({
            nextValue: -54321,
            nextUserInput: "-54,321",
            nextSelection: {start: 2}
        });
    });
});

test("backspacing plus (+) symbol moves caret backward 1 unit", () =>
{
    expect(getNextNumericInputFieldState(
        "+1",
        {start: 1},
        {keypress: Keypress.Backspace, newUserInput: "1"},
        true
    )).toEqual({
        nextValue: 1,
        nextUserInput: "+1",
        nextSelection: {start: 0}
    });
});

test("backspacing minus (-) symbol moves caret backward 1 unit", () =>
{
    [true, false].forEach(showPlusSymbolForPositiveNumber =>
    {
        expect(getNextNumericInputFieldState(
            "-1",
            {start: 1},
            {keypress: Keypress.Backspace, newUserInput: "1"},
            showPlusSymbolForPositiveNumber
        )).toEqual({
            nextValue: -1,
            nextUserInput: "-1",
            nextSelection: {start: 0}
        });
    });
});

test("deleting plus (+) symbol removes the character next to it", () =>
{
    expect(getNextNumericInputFieldState(
        "+12",
        {start: 0},
        {keypress: Keypress.Delete, newUserInput: "12"},
        true
    )).toEqual({
        nextValue: 2,
        nextUserInput: "+2",
        nextSelection: {start: 0}
    });

    expect(getNextNumericInputFieldState(
        "+1",
        {start: 0},
        {keypress: Keypress.Delete, newUserInput: "1"},
        true
    )).toEqual({
        nextValue: NaN,
        nextUserInput: "",
        nextSelection: {start: 0}
    });
});

test("deleting minus (-) symbol removes the character next to it", () =>
{
    [true, false].forEach(showPlusSymbolForPositiveNumber =>
    {
        expect(getNextNumericInputFieldState(
            "-12",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "12"},
            showPlusSymbolForPositiveNumber
        )).toEqual({
            nextValue: -2,
            nextUserInput: "-2",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "-1",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: "1"},
            showPlusSymbolForPositiveNumber
        )).toEqual({
            nextValue: 0,
            nextUserInput: "-",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "-",
            {start: 0},
            {keypress: Keypress.Delete, newUserInput: ""},
            showPlusSymbolForPositiveNumber
        )).toEqual({
            nextValue: NaN,
            nextUserInput: "",
            nextSelection: {start: 0}
        });
    });
});

test("cannot enter number smaller than 'minValue'", () =>
{
    [true, false].forEach(showPlusSymbolForPositiveNumber =>
    {
        expect(getNextNumericInputFieldState(
            "-1,234",
            {start: 6},
            {keypress: Keypress.Digit, newUserInput: "-1,2345"},
            showPlusSymbolForPositiveNumber,
            undefined,
            -5000
        )).toEqual({
            nextValue: -5000,
            nextUserInput: "-5,000",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "-1,234",
            {start: 6},
            {keypress: Keypress.Digit, newUserInput: "-1,2349"},
            showPlusSymbolForPositiveNumber,
            undefined,
            -12345
        )).toEqual({
            nextValue: -12345,
            nextUserInput: "-12,345",
            nextSelection: {start: 7}
        });
    });
});

test("cannot enter number greater than 'maxValue'", () =>
{
    expect(getNextNumericInputFieldState(
        "1,234",
        {start: 5},
        {keypress: Keypress.Digit, newUserInput: "1,2345"},
        false,
        undefined,
        undefined,
        5000
    )).toEqual({
        nextValue: 5000,
        nextUserInput: "5,000",
        nextSelection: {start: 5}
    });

    expect(getNextNumericInputFieldState(
        "+1,234",
        {start: 6},
        {keypress: Keypress.Digit, newUserInput: "+1,2345"},
        true,
        undefined,
        undefined,
        5000
    )).toEqual({
        nextValue: 5000,
        nextUserInput: "+5,000",
        nextSelection: {start: 6}
    });

    expect(getNextNumericInputFieldState(
        "1,234",
        {start: 5},
        {keypress: Keypress.Digit, newUserInput: "1,2349"},
        false,
        undefined,
        undefined,
        12345
    )).toEqual({
        nextValue: 12345,
        nextUserInput: "12,345",
        nextSelection: {start: 6}
    });
});

test("the number of fraction digits cannot be greater than 'maximumFractionDigitCount'", () =>
{
    expect(getNextNumericInputFieldState(
        "1,234.56",
        {start: 8},
        {keypress: Keypress.Digit, newUserInput: "1,234.567"},
        false,
        undefined,
        undefined,
        undefined,
        2
    )).toEqual({
        nextValue: 1234.56,
        nextUserInput: "1,234.56",
        nextSelection: {start: 8}
    });

    expect(getNextNumericInputFieldState(
        "+1,234.56",
        {start: 9},
        {keypress: Keypress.Digit, newUserInput: "+1,234.567"},
        true,
        undefined,
        undefined,
        undefined,
        2
    )).toEqual({
        nextValue: 1234.56,
        nextUserInput: "+1,234.56",
        nextSelection: {start: 9}
    });

    [true, false].forEach(showPlusSymbolForPositiveNumber =>
    {
        expect(getNextNumericInputFieldState(
            "-1,234.56",
            {start: 9},
            {keypress: Keypress.Digit, newUserInput: "-1,234.567"},
            showPlusSymbolForPositiveNumber,
            undefined,
            undefined,
            undefined,
            2
        )).toEqual({
            nextValue: -1234.56,
            nextUserInput: "-1,234.56",
            nextSelection: {start: 9}
        });
    });
});

test("treat empty input as zero", () =>
{
    expect(getNextNumericInputFieldState(
        "9",
        {start: 1},
        {keypress: Keypress.Backspace, newUserInput: ""},
        undefined,
        true
    )).toEqual({
        nextValue: 0,
        nextUserInput: "0",
        nextSelection: {start: 1}
    });

    expect(getNextNumericInputFieldState(
        "9",
        {start: 0},
        {keypress: Keypress.Delete, newUserInput: ""},
        undefined,
        true
    )).toEqual({
        nextValue: 0,
        nextUserInput: "0",
        nextSelection: {start: 1}
    });
});

test("copy-paste is ignored", () =>
{
    ["a", "1", "abc123", "123.45"].forEach(pastedText =>
    {
        [Keypress.NotSupported, undefined].forEach(keypress =>
        {
            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 7},
                {keypress, newUserInput: `1,234,5${pastedText}67,890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 7}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 13},
                {keypress, newUserInput: `1,234,567,890${pastedText}`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 13}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 0},
                {keypress, newUserInput: `${pastedText}1,234,567,890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 0},
                {keypress, newUserInput: `${pastedText}+1,234,567,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "+1,234,567,890",
                {start: 1},
                {keypress, newUserInput: `+${pastedText}1,234,567,890`},
                true
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "+1,234,567,890",
                nextSelection: {start: 1}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 0},
                {keypress, newUserInput: `${pastedText}-1,234,567,890`},
                true
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 1},
                {keypress, newUserInput: `-${pastedText}1,234,567,890`}
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: {start: 1}
            });

            expect(getNextNumericInputFieldState(
                "1,234,567,890",
                {start: 4, end: 10},
                {keypress, newUserInput: `1,23${pastedText}890`}
            )).toEqual({
                nextValue: 1234567890,
                nextUserInput: "1,234,567,890",
                nextSelection: {start: 4, end: 10}
            });
        });
    });
});

describe("when blur", () =>
{
    it("keeps valid user input as is", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                {start: 14},
                "BlurEvent",
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: undefined
            });

            expect(getNextNumericInputFieldState(
                "-1.00001",
                {start: 6},
                "BlurEvent",
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1.00001,
                nextUserInput: "-1.00001",
                nextSelection: undefined
            });

            expect(getNextNumericInputFieldState(
                "-1.500001",
                {start: 6},
                "BlurEvent",
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1.500001,
                nextUserInput: "-1.500001",
                nextSelection: undefined
            });

            expect(getNextNumericInputFieldState(
                "",
                {start: 0},
                "BlurEvent",
                showPlusSymbolForPositiveNumber,
                false
            )).toEqual({
                nextValue: NaN,
                nextUserInput: "",
                nextSelection: undefined
            });
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 13},
            "BlurEvent"
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 14},
            "BlurEvent",
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "+0",
            {start: 2},
            "BlurEvent",
            true
        )).toEqual({
            nextValue: 0,
            nextUserInput: "+0",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "1.00001",
            {start: 6},
            "BlurEvent"
        )).toEqual({
            nextValue: 1.00001,
            nextUserInput: "1.00001",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "+1.00001",
            {start: 6},
            "BlurEvent",
            true
        )).toEqual({
            nextValue: 1.00001,
            nextUserInput: "+1.00001",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "1.500001",
            {start: 6},
            "BlurEvent"
        )).toEqual({
            nextValue: 1.500001,
            nextUserInput: "1.500001",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "+1.500001",
            {start: 6},
            "BlurEvent",
            true
        )).toEqual({
            nextValue: 1.500001,
            nextUserInput: "+1.500001",
            nextSelection: undefined
        });
    });

    it("reformats invalid user input", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "-",
                {start: 1},
                "BlurEvent",
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: 0,
                nextUserInput: "0",
                nextSelection: undefined
            });

            expect(getNextNumericInputFieldState(
                "-0",
                {start: 2},
                "BlurEvent",
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: 0,
                nextUserInput: "0",
                nextSelection: undefined
            });

            expect(getNextNumericInputFieldState(
                "-0.",
                {start: 3},
                "BlurEvent",
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: 0,
                nextUserInput: "0",
                nextSelection: undefined
            });

            expect(getNextNumericInputFieldState(
                "-1.0000",
                {start: 6},
                "BlurEvent",
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1,
                nextUserInput: "-1",
                nextSelection: undefined
            });

            expect(getNextNumericInputFieldState(
                "-1.50000",
                {start: 6},
                "BlurEvent",
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1.5,
                nextUserInput: "-1.5",
                nextSelection: undefined
            });
        });

        expect(getNextNumericInputFieldState(
            "+",
            {start: 1},
            "BlurEvent",
            true
        )).toEqual({
            nextValue: 0,
            nextUserInput: "+0",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "+0.",
            {start: 3},
            "BlurEvent",
            true
        )).toEqual({
            nextValue: 0,
            nextUserInput: "+0",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "1.0000",
            {start: 6},
            "BlurEvent"
        )).toEqual({
            nextValue: 1,
            nextUserInput: "1",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "+1.0000",
            {start: 6},
            "BlurEvent",
            true
        )).toEqual({
            nextValue: 1,
            nextUserInput: "+1",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "1.50000",
            {start: 6},
            "BlurEvent"
        )).toEqual({
            nextValue: 1.5,
            nextUserInput: "1.5",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "+1.50000",
            {start: 6},
            "BlurEvent",
            true
        )).toEqual({
            nextValue: 1.5,
            nextUserInput: "+1.5",
            nextSelection: undefined
        });
    });

    it("replaces empty user input with zero if 'treatEmptyInputAsZero' option is enabled", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "",
                {start: 0},
                "BlurEvent",
                showPlusSymbolForPositiveNumber,
                true
            )).toEqual({
                nextValue: 0,
                nextUserInput: "0",
                nextSelection: {start: 1}
            });
        });
    });
});

describe("when sync", () =>
{
    it("sets value, user input & caret position", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "",
                {start: 0},
                "SyncEvent",
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: NaN,
                nextUserInput: "",
                nextSelection: {start: 0}
            });

            expect(getNextNumericInputFieldState(
                "-1,234,567,890",
                undefined,
                "SyncEvent",
                showPlusSymbolForPositiveNumber
            )).toEqual({
                nextValue: -1234567890,
                nextUserInput: "-1,234,567,890",
                nextSelection: undefined
            });
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 0},
            "SyncEvent"
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 0}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567,890",
            {start: 14},
            "SyncEvent",
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: {start: 14}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            undefined,
            "SyncEvent",
            true
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "+1,234,567,890",
            nextSelection: undefined
        });
    });

    it("respects 'treatEmptyInputAsZero' option", () =>
    {
        [true, false].forEach(showPlusSymbolForPositiveNumber =>
        {
            expect(getNextNumericInputFieldState(
                "",
                {start: 0},
                "SyncEvent",
                showPlusSymbolForPositiveNumber,
                true
            )).toEqual({
                nextValue: 0,
                nextUserInput: "0",
                nextSelection: {start: 1}
            });
        });
    });

    it("clamps value at 'minValue' or 'maxValue' if it is out of range", () =>
    {
        expect(getNextNumericInputFieldState(
            "-5001",
            undefined,
            "SyncEvent",
            undefined,
            undefined,
            -5000
        )).toEqual({
            nextValue: -5000,
            nextUserInput: "-5,000",
            nextSelection: undefined
        });

        expect(getNextNumericInputFieldState(
            "5001",
            undefined,
            "SyncEvent",
            undefined,
            undefined,
            undefined,
            5000
        )).toEqual({
            nextValue: 5000,
            nextUserInput: "5,000",
            nextSelection: undefined
        });
    });

    it("throws error when 'currentUserInput' is not valid", () =>
    {
        expect(() => getNextNumericInputFieldState(
            "123456",
            undefined,
            "SyncEvent",
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            5
        )).toThrow();

        expect(() => getNextNumericInputFieldState(
            "0.123",
            undefined,
            "SyncEvent",
            undefined,
            undefined,
            undefined,
            undefined,
            2
        )).toThrow();
    });
});

describe("when having selection including", () =>
{
    test("number only", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 6, end: 9},
            {keypress: Keypress.Backspace, newUserInput: "1,234,,890"}
        )).toEqual({
            nextValue: 1234890,
            nextUserInput: "1,234,890",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 6, end: 9},
            {keypress: Keypress.Delete, newUserInput: "1,234,,890"}
        )).toEqual({
            nextValue: 1234890,
            nextUserInput: "1,234,890",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 6, end: 9},
            {keypress: Keypress.Dot, newUserInput: "1,234,.,890"}
        )).toEqual({
            nextValue: 1234.890,
            nextUserInput: "1,234.89",
            nextSelection: {start: 6}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 6, end: 9},
            {keypress: Keypress.Digit, newUserInput: "1,234,1,890"}
        )).toEqual({
            nextValue: 12341890,
            nextUserInput: "12,341,890",
            nextSelection: {start: 7}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 6, end: 9},
            {keypress: Keypress.NotSupported, newUserInput: "1,234,a,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 6, end: 9}
        });
    });

    test("number & 1 comma", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 3, end: 8},
            {keypress: Keypress.Backspace, newUserInput: "1,27,890"}
        )).toEqual({
            nextValue: 127890,
            nextUserInput: "127,890",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 3, end: 8},
            {keypress: Keypress.Delete, newUserInput: "1,27,890"}
        )).toEqual({
            nextValue: 127890,
            nextUserInput: "127,890",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 3, end: 8},
            {keypress: Keypress.Dot, newUserInput: "1,2.7,890"}
        )).toEqual({
            nextValue: 12.789,
            nextUserInput: "12.789",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 3, end: 8},
            {keypress: Keypress.Digit, newUserInput: "1,217,890"}
        )).toEqual({
            nextValue: 1217890,
            nextUserInput: "1,217,890",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 3, end: 8},
            {keypress: Keypress.NotSupported, newUserInput: "1,2a7,890"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 3, end: 8}
        });
    });

    test("number & 2 commas", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 4, end: 11},
            {keypress: Keypress.Backspace, newUserInput: "1,2390"}
        )).toEqual({
            nextValue: 12390,
            nextUserInput: "12,390",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 4, end: 11},
            {keypress: Keypress.Delete, newUserInput: "1,2390"}
        )).toEqual({
            nextValue: 12390,
            nextUserInput: "12,390",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 4, end: 11},
            {keypress: Keypress.Dot, newUserInput: "1,23.90"}
        )).toEqual({
            nextValue: 123.9,
            nextUserInput: "123.9",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 4, end: 11},
            {keypress: Keypress.Digit, newUserInput: "1,23190"}
        )).toEqual({
            nextValue: 123190,
            nextUserInput: "123,190",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567,890",
            {start: 4, end: 11},
            {keypress: Keypress.NotSupported, newUserInput: "1,23a90"}
        )).toEqual({
            nextValue: 1234567890,
            nextUserInput: "1,234,567,890",
            nextSelection: {start: 4, end: 11}
        });
    });

    test("number, comma & dot", () =>
    {
        expect(getNextNumericInputFieldState(
            "1,234,567.89",
            {start: 4, end: 11},
            {keypress: Keypress.Backspace, newUserInput: "1,239"}
        )).toEqual({
            nextValue: 1239,
            nextUserInput: "1,239",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567.89",
            {start: 4, end: 11},
            {keypress: Keypress.Delete, newUserInput: "1,239"}
        )).toEqual({
            nextValue: 1239,
            nextUserInput: "1,239",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567.89",
            {start: 4, end: 11},
            {keypress: Keypress.Dot, newUserInput: "1,23.9"}
        )).toEqual({
            nextValue: 123.9,
            nextUserInput: "123.9",
            nextSelection: {start: 4}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567.89",
            {start: 4, end: 11},
            {keypress: Keypress.Digit, newUserInput: "1,2319"}
        )).toEqual({
            nextValue: 12319,
            nextUserInput: "12,319",
            nextSelection: {start: 5}
        });

        expect(getNextNumericInputFieldState(
            "1,234,567.89",
            {start: 4, end: 11},
            {keypress: Keypress.NotSupported, newUserInput: "1,23a9"}
        )).toEqual({
            nextValue: 1234567.89,
            nextUserInput: "1,234,567.89",
            nextSelection: {start: 4, end: 11}
        });
    });

    test("number, comma, dot & sign", () =>
    {
        expect(getNextNumericInputFieldState(
            "+1,234,567.89",
            {start: 0, end: 11},
            {keypress: Keypress.Backspace, newUserInput: "89"},
            true
        )).toEqual({
            nextValue: 89,
            nextUserInput: "+89",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567.89",
            {start: 0, end: 11},
            {keypress: Keypress.Delete, newUserInput: "89"},
            true
        )).toEqual({
            nextValue: 89,
            nextUserInput: "+89",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567.89",
            {start: 0, end: 11},
            {keypress: Keypress.Dot, newUserInput: ".89"},
            true
        )).toEqual({
            nextValue: 0.89,
            nextUserInput: "+0.89",
            nextSelection: {start: 3}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567.89",
            {start: 0, end: 11},
            {keypress: Keypress.Digit, newUserInput: "189"},
            true
        )).toEqual({
            nextValue: 189,
            nextUserInput: "+189",
            nextSelection: {start: 2}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567.89",
            {start: 0, end: 11},
            {keypress: Keypress.Minus, newUserInput: "-89"},
            true
        )).toEqual({
            nextValue: -89,
            nextUserInput: "-89",
            nextSelection: {start: 1}
        });

        expect(getNextNumericInputFieldState(
            "+1,234,567.89",
            {start: 0, end: 11},
            {keypress: Keypress.NotSupported, newUserInput: "a89"},
            true
        )).toEqual({
            nextValue: 1234567.89,
            nextUserInput: "+1,234,567.89",
            nextSelection: {start: 0, end: 11}
        });
    });
});

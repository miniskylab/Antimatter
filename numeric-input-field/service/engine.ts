import {clampNumber, EMPTY_STRING, isNullOrUndefined, MAX, MIN, Selection} from "@miniskylab/antimatter-framework";
import {Keypress} from "../enum";

type KeypressEvent = { keypress: Keypress; newUserInput: string };
export function getNextNumericInputFieldState(
    currentUserInput: string,
    currentSelection: Selection,
    lastEvent: "BlurEvent" | "SyncEvent" | KeypressEvent,
    showPlusSymbolForPositiveNumber = false,
    minValue = MIN,
    maxValue = MAX,
    maximumFractionDigits = 20,
    maximumDigitCount = MAX
): {
    nextValue: number;
    nextUserInput: string;
    nextSelection: Selection;
}
{
    if (lastEvent === "SyncEvent")
    {
        const {numericValue: nextValue, formattedUserInput: nextUserInput} = reformatAndExtractNumericValueFrom(currentUserInput);
        if (getDigitCountOf(`${nextValue}`) > maximumDigitCount || getFractionDigitCountOf(`${nextValue}`) > maximumFractionDigits)
        {
            throw new Error("Cannot Sync invalid value");
        }

        return {nextValue, nextUserInput, nextSelection: currentSelection};
    }
    else if (lastEvent === "BlurEvent")
    {
        if (["-", "-0", "-0."].includes(currentUserInput))
        {
            return {nextValue: 0, nextUserInput: "0", nextSelection: undefined};
        }
        else if (showPlusSymbolForPositiveNumber && currentUserInput === "+")
        {
            return {nextValue: 0, nextUserInput: "+0", nextSelection: undefined};
        }
        else if (endWithDotAndZeros(currentUserInput))
        {
            const {numericValue: nextValue} = reformatAndExtractNumericValueFrom(currentUserInput);
            return {nextValue, nextUserInput: currentUserInput.replace(/\.0*$/g, EMPTY_STRING), nextSelection: undefined};
        }

        const {numericValue: nextValue, formattedUserInput: nextUserInput} = reformatAndExtractNumericValueFrom(currentUserInput);
        return {nextValue, nextUserInput, nextSelection: undefined};
    }
    else
    {
        const keypressEvent = lastEvent;
        keypressEvent.keypress = keypressEvent.keypress ?? Keypress.NotSupported;

        const hasSelection = currentSelection.start < currentSelection.end;
        const newDotCount = keypressEvent.newUserInput.split(".").length - 1;

        if (
            (getFractionDigitCountOf(keypressEvent.newUserInput) > maximumFractionDigits) ||
            (maximumFractionDigits === 0 && keypressEvent.keypress === Keypress.Dot) ||
            (getDigitCountOf(keypressEvent.newUserInput) > maximumDigitCount) ||
            (minValue >= 0 && keypressEvent.keypress === Keypress.Minus) ||
            (keypressEvent.keypress === Keypress.NotSupported) ||
            (newDotCount > 1)
        )
        {
            const {numericValue: nextValue, formattedUserInput: nextUserInput} = reformatAndExtractNumericValueFrom(currentUserInput);
            return {nextValue, nextUserInput, nextSelection: currentSelection};
        }

        const newUserInput = keypressEvent.newUserInput && !keypressEvent.newUserInput.startsWith("-") && currentUserInput.startsWith("-")
            ? `-${keypressEvent.newUserInput}`
            : keypressEvent.newUserInput;

        let {numericValue: nextValue, formattedUserInput: nextUserInput} = reformatAndExtractNumericValueFrom(newUserInput);
        let nextCaretPosition = !hasSelection && keypressEvent.keypress === Keypress.Backspace && currentSelection.start > 0
            ? currentSelection.start - 1
            : keypressEvent.keypress === Keypress.Digit ||
              keypressEvent.keypress === Keypress.Minus ||
              keypressEvent.keypress === Keypress.Dot
                ? currentSelection.start + 1
                : currentSelection.start;

        const currentCommaCountBeforeCaret = currentUserInput.substring(0, currentSelection.start).split(",").length - 1;
        let nextCommaCountBeforeCaret = nextUserInput.substring(0, nextCaretPosition).split(",").length - 1;
        let commaCountBeforeCaretDifference = nextCommaCountBeforeCaret - currentCommaCountBeforeCaret;

        if (keypressEvent.keypress === Keypress.Backspace)
        {
            const indexOfDeletedCharacter = currentSelection.start - 1;
            if (!hasSelection && currentUserInput.charAt(indexOfDeletedCharacter) === ",")
            {
                ({
                    numericValue: nextValue,
                    formattedUserInput: nextUserInput
                } = reformatAndExtractNumericValueFrom(
                    newUserInput.slice(0, indexOfDeletedCharacter - 1) + newUserInput.slice(indexOfDeletedCharacter)
                ));

                nextCommaCountBeforeCaret = nextUserInput.substring(0, nextCaretPosition).split(",").length - 1;
                commaCountBeforeCaretDifference = nextCommaCountBeforeCaret - currentCommaCountBeforeCaret;
            }

            nextCaretPosition += commaCountBeforeCaretDifference;
            if (
                nextUserInput.charAt(nextCaretPosition - 1) === "," ||
                (currentUserInput.startsWith("+") && !nextUserInput.startsWith("+"))
            )
            {
                nextCaretPosition -= 1;
            }
            else if (hasSelection && nextCaretPosition === 0 && (nextUserInput.startsWith("+") || nextUserInput.startsWith("-")))
            {
                nextCaretPosition += 1;
            }

            return {nextValue, nextUserInput, nextSelection: {start: nextCaretPosition}};
        }
        else if (keypressEvent.keypress === Keypress.Delete)
        {
            const indexOfDeletedCharacter = currentSelection.start;
            if (!hasSelection && [",", "+"].includes(currentUserInput.charAt(indexOfDeletedCharacter)))
            {
                ({
                    numericValue: nextValue,
                    formattedUserInput: nextUserInput
                } = reformatAndExtractNumericValueFrom(
                    newUserInput.slice(0, indexOfDeletedCharacter) + newUserInput.slice(indexOfDeletedCharacter + 1)
                ));

                nextCommaCountBeforeCaret = nextUserInput.substring(0, nextCaretPosition).split(",").length - 1;
                commaCountBeforeCaretDifference = nextCommaCountBeforeCaret - currentCommaCountBeforeCaret;
            }
            else if (!hasSelection && currentUserInput !== "-" && currentUserInput.charAt(indexOfDeletedCharacter) === "-")
            {
                ({
                    numericValue: nextValue,
                    formattedUserInput: nextUserInput
                } = reformatAndExtractNumericValueFrom(`-${newUserInput.slice(2)}`));

                nextCommaCountBeforeCaret = nextUserInput.substring(0, nextCaretPosition).split(",").length - 1;
                commaCountBeforeCaretDifference = nextCommaCountBeforeCaret - currentCommaCountBeforeCaret;
            }
            else if (hasSelection && nextCaretPosition === 0 && (nextUserInput.startsWith("+") || nextUserInput.startsWith("-")))
            {
                nextCaretPosition += 1;
            }

            nextCaretPosition += commaCountBeforeCaretDifference;
            return {nextValue, nextUserInput, nextSelection: {start: nextCaretPosition}};
        }

        nextCaretPosition += commaCountBeforeCaretDifference;
        if (
            (!currentUserInput.startsWith("+") && nextUserInput.startsWith("+")) ||
            (
                currentSelection.start === 0 && keypressEvent.keypress === Keypress.Digit &&
                (currentUserInput.startsWith("+") || currentUserInput.startsWith("-"))
            )
        )
        {
            nextCaretPosition += 1;
        }
        else if (nextUserInput === currentUserInput)
        {
            nextCaretPosition = currentSelection.start;
        }
        else if (keypressEvent.keypress === Keypress.Dot)
        {
            nextCaretPosition = nextUserInput.indexOf(".") + 1;
        }
        else if (nextCaretPosition > nextUserInput.length)
        {
            nextCaretPosition = nextUserInput.length;
        }

        return {nextValue, nextUserInput, nextSelection: {start: nextCaretPosition}};
    }

    function getDigitCountOf(anyString: string): number
    {
        return anyString.replace(/\D/g, EMPTY_STRING).length;
    }

    function getFractionDigitCountOf(anyString: string): number
    {
        const dotIndex = anyString.indexOf(".");
        if (dotIndex < 0)
        {
            return 0;
        }

        return anyString.substring(dotIndex + 1).length;
    }

    function tryParse(anyString: string): number
    {
        if (purify(anyString) === EMPTY_STRING)
        {
            return NaN;
        }

        if (purify(anyString) === "-")
        {
            return 0;
        }

        const numericResult = +purify(anyString);
        if (numericResult === -0)
        {
            return 0;
        }

        return numericResult;
    }

    function reformatAndExtractNumericValueFrom(anyString: string): { numericValue: number; formattedUserInput: string }
    {
        const numericValue = clampNumber(tryParse(anyString), minValue, maxValue);
        if (isNaN(numericValue))
        {
            return {
                numericValue: undefined,
                formattedUserInput: EMPTY_STRING
            };
        }

        if (["-", "-0", "-0."].includes(anyString))
        {
            return {
                numericValue,
                formattedUserInput: anyString
            };
        }

        const showPlusSymbol = numericValue >= 0 && showPlusSymbolForPositiveNumber;
        let formattedUserInput = showPlusSymbol
            ? `+${numericValue.toLocaleString("en-us", {maximumFractionDigits})}`
            : numericValue.toLocaleString("en-us", {maximumFractionDigits});

        if (endWithDotAndZeros(anyString))
        {
            const dotAndZeros = anyString.slice(anyString.indexOf("."));
            formattedUserInput += dotAndZeros;
        }

        return {
            numericValue,
            formattedUserInput
        };
    }
}

function endWithDotAndZeros(anyString: string): boolean
{
    if (isNullOrUndefined(anyString))
    {
        return false;
    }

    return anyString.match(/^[^.]*\.0*$/g) !== null;
}

function purify(anyString: string): string
{
    return anyString.replace(/[^-+.\d]/g, EMPTY_STRING)
        .replace(/^-\+/g, "-")
        .replace(/^\+-/g, "-")
        .replace(/(?!^)[-+]/g, EMPTY_STRING);
}

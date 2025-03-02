import {EMPTY_STRING, isNotNullAndUndefined, isNullOrUndefined, MAX_NUMBER, MIN_NUMBER, Ts} from "@miniskylab/antimatter-framework";
import {Selection} from "@miniskylab/antimatter-text-input";
import {Keypress} from "../enums";

type KeypressEvent = { keypress: Keypress; newUserInput: string };
type ReturnTypeOfThisFunction = ReturnType<typeof getNextNumericInputFieldState>;
export function getNextNumericInputFieldState(
    currentUserInput: string,
    currentSelection: Selection | undefined,
    lastEvent: "BlurEvent" | "SyncEvent" | KeypressEvent | undefined,
    showPlusSymbolForPositiveNumber = false,
    treatEmptyInputAsZero = false,
    minValue = MIN_NUMBER,
    maxValue = MAX_NUMBER,
    maximumFractionDigitCount = 20,
    maximumDigitCount = MAX_NUMBER
): {
    nextValue: number | undefined;
    nextUserInput: string;
    nextSelection: Selection | undefined;
}
{
    if (lastEvent === "SyncEvent")
    {
        const {numericValue: nextValue, formattedUserInput: nextUserInput} = reformatAndExtractNumericValueFrom(currentUserInput);
        if (getDigitCountOf(`${nextValue}`) > maximumDigitCount || getFractionDigitCountOf(`${nextValue}`) > maximumFractionDigitCount)
        {
            throw new Error("Cannot Sync invalid value");
        }

        return postProcess({nextValue, nextUserInput, nextSelection: currentSelection});
    }
    else if (lastEvent === "BlurEvent")
    {
        if (["-", "-0", "-0."].includes(currentUserInput))
        {
            return postProcess({nextValue: 0, nextUserInput: "0", nextSelection: undefined});
        }
        else if (showPlusSymbolForPositiveNumber && currentUserInput === "+")
        {
            return postProcess({nextValue: 0, nextUserInput: "+0", nextSelection: undefined});
        }
        else if (endWithDotAndZeros(currentUserInput))
        {
            const {numericValue: nextValue} = reformatAndExtractNumericValueFrom(currentUserInput);
            return postProcess({nextValue, nextUserInput: currentUserInput.replace(/\.0*$/g, EMPTY_STRING), nextSelection: undefined});
        }

        const {numericValue: nextValue, formattedUserInput: nextUserInput} = reformatAndExtractNumericValueFrom(currentUserInput);
        return postProcess({nextValue, nextUserInput, nextSelection: undefined});
    }
    else if (isKeypressEvent(lastEvent))
    {
        Ts.Error.throwIfNullOrUndefined(currentSelection);

        const keypressEvent = lastEvent;
        keypressEvent.keypress = keypressEvent.keypress ?? Keypress.NotSupported;

        const hasSelection = currentSelection.end && currentSelection.end > currentSelection.start;
        const newDotCount = keypressEvent.newUserInput.split(".").length - 1;

        if (
            (getFractionDigitCountOf(keypressEvent.newUserInput) > maximumFractionDigitCount) ||
            (maximumFractionDigitCount === 0 && keypressEvent.keypress === Keypress.Dot) ||
            (getDigitCountOf(keypressEvent.newUserInput) > maximumDigitCount) ||
            (minValue >= 0 && keypressEvent.keypress === Keypress.Minus) ||
            (keypressEvent.keypress === Keypress.NotSupported) ||
            (newDotCount > 1)
        )
        {
            const {numericValue: nextValue, formattedUserInput: nextUserInput} = reformatAndExtractNumericValueFrom(currentUserInput);
            return postProcess({nextValue, nextUserInput, nextSelection: currentSelection});
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

            return postProcess({nextValue, nextUserInput, nextSelection: {start: nextCaretPosition}});
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
            return postProcess({nextValue, nextUserInput, nextSelection: {start: nextCaretPosition}});
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
            nextCaretPosition = currentSelection.end ?? currentSelection.start;
        }
        else if (keypressEvent.keypress === Keypress.Dot)
        {
            nextCaretPosition = nextUserInput.indexOf(".") + 1;
        }
        else if (nextCaretPosition > nextUserInput.length)
        {
            nextCaretPosition = nextUserInput.length;
        }

        return postProcess({nextValue, nextUserInput, nextSelection: {start: nextCaretPosition}});
    }
    else
    {
        throw new Error("Non-keypress events are not supported");
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

    function tryParse(anyString: string): number | undefined
    {
        if (purify(anyString) === EMPTY_STRING)
        {
            return undefined;
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

    function reformatAndExtractNumericValueFrom(anyString: string): { numericValue: number | undefined; formattedUserInput: string }
    {
        const numericValue = Ts.Number.clamp(tryParse(anyString), minValue, maxValue);
        if (Number.isNaN(numericValue))
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
            ? `+${numericValue.toLocaleString("en-us", {maximumFractionDigits: maximumFractionDigitCount})}`
            : numericValue.toLocaleString("en-us", {maximumFractionDigits: maximumFractionDigitCount});

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

    function postProcess(output: ReturnTypeOfThisFunction): ReturnTypeOfThisFunction
    {
        if (treatEmptyInputAsZero && !output.nextUserInput)
        {
            output.nextValue = 0;
            output.nextUserInput = "0";
            output.nextSelection = {start: 1};
        }

        return output;
    }
}

function endWithDotAndZeros(anyString: string): boolean
{
    if (isNullOrUndefined(anyString))
    {
        return false;
    }

    return /^[^.]*\.0*$/g.test(anyString);
}

function purify(anyString: string): string
{
    return anyString.replace(/[^-+.\d]/g, EMPTY_STRING)
        .replace(/^-\+/g, "-")
        .replace(/^\+-/g, "-")
        .replace(/(?!^)[-+]/g, EMPTY_STRING);
}

function isKeypressEvent(anything: unknown): anything is KeypressEvent
{
    return typeof anything === "object" && isNotNullAndUndefined(anything) && anything.hasOwnProperty("keypress");
}

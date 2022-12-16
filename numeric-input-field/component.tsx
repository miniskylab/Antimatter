import {EMPTY_STRING, MAX, MIN} from "@miniskylab/antimatter-framework";
import {InputField} from "@miniskylab/antimatter-input-field";
import React, {useEffect, useRef, useState} from "react";
import {NativeSyntheticEvent, TextInputFocusEventData, TextInputKeyPressEventData, TextInputSelectionChangeEventData} from "react-native";
import {getNextNumericInputFieldState, Keypress, NumericInputFieldProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function NumericInputField({
    style = Variant.Default,
    defaultValue,
    minValue = MIN,
    maxValue = MAX,
    maximumFractionDigits = 20,
    maximumDigitCount = MAX,
    showPlusSymbolForPositiveNumber = false,
    placeholder = EMPTY_STRING,
    autoFocus = false,
    onChange,
    onBlur,
    onFocus,
    onKeyPress
}: NumericInputFieldProps): JSX.Element
{
    validateAndThrow();

    const Style = style({
        defaultValue,
        minValue,
        maxValue,
        maximumFractionDigits,
        maximumDigitCount,
        showPlusSymbolForPositiveNumber,
        placeholder,
        autoFocus,
        onChange,
        onBlur,
        onFocus,
        onKeyPress
    });

    const lastKeypressRef = useRef<Keypress>();
    const ignoreNextSelectionChangeEventRef = useRef(false);
    const [selection, setSelection] = useState({start: 0});
    const [userInput, setUserInput] = useState(getDefaultUserInput());

    useEffect(() =>
    {
        const {nextUserInput, nextSelection} = getNextNumericInputFieldState(
            userInput,
            selection,
            "SyncEvent",
            showPlusSymbolForPositiveNumber,
            minValue,
            maxValue,
            maximumFractionDigits,
            maximumDigitCount
        );

        setUserInput(nextUserInput);
        setSelection(nextSelection);
        ignoreNextSelectionChangeEventRef.current = true;
    }, [showPlusSymbolForPositiveNumber, minValue, maxValue, maximumFractionDigits, maximumDigitCount]);

    return (
        <InputField
            style={Style.Root}
            value={userInput}
            selection={selection}
            autoFocus={autoFocus}
            placeholder={placeholder}
            maxLength={userInput.length + 1}
            autoCorrect={false}
            contextMenuHidden={true}
            keyboardType={"numbers-and-punctuation"}
            onChangeText={handleChangeEvent}
            onSelectionChange={handleSelectionChangeEvent}
            onKeyPress={handleKeypressEvent}
            onBlur={handleBlurEvent}
            onFocus={onFocus}
        />
    );

    function handleChangeEvent(newUserInput: string): void
    {
        const {nextValue, nextUserInput, nextSelection} = getNextNumericInputFieldState(
            userInput,
            selection,
            {keypress: lastKeypressRef.current, newUserInput},
            showPlusSymbolForPositiveNumber,
            minValue,
            maxValue,
            maximumFractionDigits,
            maximumDigitCount
        );

        setUserInput(nextUserInput);
        setSelection(nextSelection);
        ignoreNextSelectionChangeEventRef.current = true;

        onChange?.(nextValue);
    }

    function handleSelectionChangeEvent(selectionChangeEvent: NativeSyntheticEvent<TextInputSelectionChangeEventData>): void
    {
        if (ignoreNextSelectionChangeEventRef.current)
        {
            ignoreNextSelectionChangeEventRef.current = false;
            return;
        }

        setSelection(selectionChangeEvent.nativeEvent.selection);
    }

    function handleKeypressEvent(keypressEvent: NativeSyntheticEvent<TextInputKeyPressEventData>): void
    {
        switch (keypressEvent.nativeEvent.key)
        {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                lastKeypressRef.current = Keypress.Digit;
                break;

            case ".":
                lastKeypressRef.current = Keypress.Dot;
                break;

            case "-":
                lastKeypressRef.current = Keypress.Minus;
                break;

            case "Delete":
                lastKeypressRef.current = Keypress.Delete;
                break;

            case "Backspace":
                lastKeypressRef.current = Keypress.Backspace;
                break;

            default:
                lastKeypressRef.current = Keypress.NotSupported;
        }
    }

    function handleBlurEvent(focusEvent: NativeSyntheticEvent<TextInputFocusEventData>): void
    {
        const {nextUserInput} = getNextNumericInputFieldState(
            userInput,
            selection,
            "BlurEvent",
            showPlusSymbolForPositiveNumber,
            minValue,
            maxValue,
            maximumFractionDigits,
            maximumDigitCount
        );

        setUserInput(nextUserInput);
        onBlur?.(focusEvent);
    }

    function validateAndThrow(): void
    {
        if (minValue > maxValue)
        {
            throw new Error(
                `"minValue" cannot be greater than or equal to "maxValue". ` +
                `Received values: minValue = ${minValue}, maxValue = ${maxValue}`
            );
        }

        if (defaultValue < minValue)
        {
            throw new Error(
                `"defaultValue" cannot be less than "minValue". ` +
                `Received values: defaultValue = ${defaultValue}, minValue = ${minValue}`
            );
        }

        if (defaultValue > maxValue)
        {
            throw new Error(
                `"defaultValue" cannot greater less than "maxValue". ` +
                `Received values: defaultValue = ${defaultValue}, minValue = ${maxValue}`
            );
        }
    }

    function getDefaultUserInput(): string
    {
        let defaultUserInput = EMPTY_STRING;
        if (defaultValue || defaultValue === 0)
        {
            ({nextUserInput: defaultUserInput} = getNextNumericInputFieldState(
                `${defaultValue}`,
                {start: 0, end: 0},
                "SyncEvent",
                showPlusSymbolForPositiveNumber,
                minValue,
                maxValue,
                maximumFractionDigits,
                maximumDigitCount
            ));
        }

        return defaultUserInput;
    }
}

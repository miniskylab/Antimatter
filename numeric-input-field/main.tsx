import {AllPropertiesMustPresent, EMPTY_STRING, MAX, MIN, Style, Ts} from "@miniskylab/antimatter-framework";
import {InputField} from "@miniskylab/antimatter-input-field";
import React, {forwardRef, JSX, MutableRefObject, useEffect, useMemo, useRef, useState} from "react";
import {NativeSyntheticEvent, TextInputFocusEventData, TextInputKeyPressEventData, TextInputSelectionChangeEventData} from "react-native";
import {Keypress} from "./enums";
import {NumericInputFieldContext, NumericInputFieldProps, NumericInputFieldState} from "./models";
import {getNextNumericInputFieldState} from "./services";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export const NumericInputField = forwardRef(function NumericInputField(
    {
        style = Variant.Default,
        defaultValue,
        minValue = MIN,
        maxValue = MAX,
        autoFocus = false,
        maximumDigitCount = MAX,
        placeholder = EMPTY_STRING,
        maximumFractionDigitCount = 20,
        treatEmptyInputAsZero = false,
        keyboardType = "numbers-and-punctuation",
        showPlusSymbolForPositiveNumber = false,
        selectAllOnFocus = false,
        onChange,
        onBlur,
        onFocus,
        onKeyPress
    }: NumericInputFieldProps,
    ref: MutableRefObject<NumericInputField>
): JSX.Element
{
    const props: AllPropertiesMustPresent<NumericInputFieldProps> = {
        style, defaultValue, minValue, maxValue, maximumFractionDigitCount, maximumDigitCount, placeholder, autoFocus,
        treatEmptyInputAsZero, keyboardType, showPlusSymbolForPositiveNumber, selectAllOnFocus, onChange, onBlur, onFocus, onKeyPress
    };

    const [state, setState] = useState<NumericInputFieldState>({
        selection: undefined,
        userInput: getDefaultUserInput()
    });

    const context = useMemo<NumericInputFieldContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const computedStyle = Style.useComputedStyle(style, props, state);

    const lastKeypressRef = useRef<Keypress>();
    const ignoreNextSelectionChangeEventRef = useRef(false);

    useEffect(() =>
    {
        const {nextUserInput, nextSelection} = getNextNumericInputFieldState(
            state.userInput,
            state.selection,
            "SyncEvent",
            showPlusSymbolForPositiveNumber,
            treatEmptyInputAsZero,
            minValue,
            maxValue,
            maximumFractionDigitCount,
            maximumDigitCount
        );

        setState(prevState => ({
            ...prevState,
            selection: nextSelection,
            userInput: nextUserInput
        }));
    }, [showPlusSymbolForPositiveNumber, treatEmptyInputAsZero, minValue, maxValue, maximumFractionDigitCount, maximumDigitCount]);

    validateAndThrow();
    return (
        <NumericInputFieldContext.Provider value={context}>
            <InputField
                ref={ref}
                style={computedStyle}
                value={state.userInput}
                selection={state.selection}
                autoFocus={autoFocus}
                placeholder={placeholder}
                maxLength={state.userInput.length + 1}
                autoCorrect={false}
                contextMenuHidden={true}
                keyboardType={keyboardType}
                onChangeText={handleChangeEvent}
                onSelectionChange={handleSelectionChangeEvent}
                onKeyPress={handleKeypressEvent}
                onBlur={handleBlurEvent}
                onFocus={handleFocusEvent}
            />
        </NumericInputFieldContext.Provider>
    );

    function handleChangeEvent(newUserInput: string): void
    {
        const {nextValue, nextUserInput, nextSelection} = getNextNumericInputFieldState(
            state.userInput,
            state.selection,
            {keypress: lastKeypressRef.current, newUserInput},
            showPlusSymbolForPositiveNumber,
            treatEmptyInputAsZero,
            minValue,
            maxValue,
            maximumFractionDigitCount,
            maximumDigitCount
        );

        ignoreNextSelectionChangeEventRef.current = true;
        setState(prevState => ({
            ...prevState,
            selection: nextSelection,
            userInput: nextUserInput
        }));

        onChange?.(nextValue);
    }

    function handleSelectionChangeEvent(selectionChangeEvent: NativeSyntheticEvent<TextInputSelectionChangeEventData>): void
    {
        if (ignoreNextSelectionChangeEventRef.current)
        {
            ignoreNextSelectionChangeEventRef.current = false;
            return;
        }

        const selection = selectionChangeEvent.nativeEvent.selection;
        setState(prevState => ({
            ...prevState,
            selection
        }));
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

        onKeyPress?.(keypressEvent);
    }

    function handleBlurEvent(focusEvent: NativeSyntheticEvent<TextInputFocusEventData>): void
    {
        const {nextUserInput, nextSelection} = getNextNumericInputFieldState(
            state.userInput,
            state.selection,
            "BlurEvent",
            showPlusSymbolForPositiveNumber,
            treatEmptyInputAsZero,
            minValue,
            maxValue,
            maximumFractionDigitCount,
            maximumDigitCount
        );

        setState(prevState => ({
            ...prevState,
            userInput: nextUserInput,
            selection: nextSelection
        }));

        onBlur?.(focusEvent);
    }

    function handleFocusEvent(focusEvent: NativeSyntheticEvent<TextInputFocusEventData>): void
    {
        setState(prevState => ({
            ...prevState,
            selection: {
                start: selectAllOnFocus ? 0 : prevState.userInput.length,
                end: prevState.userInput.length
            }
        }));

        onFocus?.(focusEvent);
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
                treatEmptyInputAsZero,
                minValue,
                maxValue,
                maximumFractionDigitCount,
                maximumDigitCount
            ));
        }

        return defaultUserInput;
    }
});

export type NumericInputField = InputField;

import {
    type AllPropertiesMustPresent,
    EMPTY_STRING,
    isNotNullAndUndefined,
    MAX_NUMBER,
    MIN_NUMBER,
    Ts,
    useComponentContext,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {InputField} from "@miniskylab/antimatter-input-field";
import React, {forwardRef, JSX, RefObject, useEffect, useImperativeHandle, useRef, useState} from "react";
import {NativeSyntheticEvent, TextInputFocusEventData, TextInputKeyPressEventData, TextInputSelectionChangeEventData} from "react-native";
import {Keypress} from "./enums";
import {NumericInputFieldContext, NumericInputFieldProps, type NumericInputFieldState} from "./models";
import {getNextNumericInputFieldState} from "./services";
import * as Variant from "./variants";

/**
 * A component that only allows users to input numbers.
 */
export const NumericInputField = forwardRef(function NumericInputField(
    {
        style = Variant.Default,
        defaultValue,
        minValue = MIN_NUMBER,
        maxValue = MAX_NUMBER,
        editable = true,
        focusable = true,
        autoFocus = false,
        maximumDigitCount = MAX_NUMBER,
        placeholder = EMPTY_STRING,
        maximumFractionDigitCount = 20,
        treatEmptyInputAsZero = false,
        keyboardType = "numbers-and-punctuation",
        showPlusSymbolForPositiveNumber = false,
        selectTextOnFocus = false,
        onChange,
        onBlur,
        onFocus,
        onKeyPress
    }: NumericInputFieldProps,
    ref: RefObject<NumericInputField>
): JSX.Element
{
    const props: AllPropertiesMustPresent<NumericInputFieldProps> = {
        style, defaultValue, minValue, maxValue, editable, focusable, autoFocus, maximumDigitCount, placeholder, maximumFractionDigitCount,
        treatEmptyInputAsZero, keyboardType, showPlusSymbolForPositiveNumber, selectTextOnFocus, onChange, onBlur, onFocus, onKeyPress
    };

    const [state, setState] = useState<NumericInputFieldState>({
        selection: undefined,
        userInput: getDefaultUserInput()
    });

    const lastKeypressRef = useRef<Keypress>(null);
    const internalRef = useRef<NumericInputField>(null);
    const ignoreNextSelectionChangeEventRef = useRef(false);

    const context = useComponentContext<NumericInputFieldContext>({props, state});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle, imperativeHandles} = useComputedStyle(style, props, state);

    useImperativeHandle(ref, () => ({...internalRef.current!, ...imperativeHandles}), []);

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

    useEffect(() =>
    {
        if (state.selection?.end && state.selection.end !== state.selection.start)
        {
            internalRef?.current?.setSelection(
                state.selection.start,
                state.selection.end ?? state.selection.start
            );
        }
    });

    validateAndThrow();
    return (
        <NumericInputFieldContext.Provider value={context}>
            <InputField
                ref={internalRef}
                style={computedStyle}
                value={state.userInput}
                selection={state.selection}
                editable={editable}
                focusable={focusable}
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
            lastKeypressRef.current ? {keypress: lastKeypressRef.current, newUserInput} : undefined,
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
                start: selectTextOnFocus ? 0 : prevState.userInput.length,
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

        if (isNotNullAndUndefined(defaultValue))
        {
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
                    `"defaultValue" cannot be greater than "maxValue". ` +
                    `Received values: defaultValue = ${defaultValue}, maxValue = ${maxValue}`
                );
            }
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

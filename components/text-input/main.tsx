import {
    type AllPropertiesMustPresent,
    EMPTY_STRING,
    inheritTextStyleFrom,
    Ts,
    useComputedStyle,
    useTypography
} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React, {forwardRef, JSX, MutableRefObject, useImperativeHandle, useRef} from "react";
import * as ReactNative from "react-native";
import {TextInputProps} from "./models";
import * as Variant from "./variants";

/**
 * @see https://reactnative.dev/docs/textinput
 */
export const TextInput = forwardRef(function TextInput(
    {
        style = Variant.Default,
        value = EMPTY_STRING,
        focusable = true,
        autoFocus = false,
        editable = true,
        secureTextEntry = false,
        contextMenuHidden = false,
        autoCorrect = true,
        maxLength,
        keyboardType = "default",
        selection,
        onChangeText,
        onSelectionChange,
        onBlur,
        onFocus,
        onKeyPress
    }: TextInputProps,
    ref: MutableRefObject<TextInput>
): JSX.Element
{
    const props: AllPropertiesMustPresent<TextInputProps> = {
        style, value, focusable, autoFocus, editable, secureTextEntry, contextMenuHidden, autoCorrect, maxLength, keyboardType, selection,
        onChangeText, onSelectionChange, onBlur, onFocus, onKeyPress
    };

    const internalRef = useRef<TextInput>(null);

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle, imperativeHandles} = useComputedStyle(style, props);

    useImperativeHandle(ref, () => ({
        ...imperativeHandles,
        ...internalRef.current!,
        focus: () => { internalRef.current?.focus(); },
        setSelection: (start, end) => { internalRef.current?.setSelection?.(start, end); }
    }), []);

    return (
        <View style={() => computedStyle}>
            <ReactNative.TextInput
                ref={internalRef}
                editable={editable}
                focusable={focusable}
                autoCorrect={autoCorrect}
                secureTextEntry={secureTextEntry}
                style={{
                    ...inheritTextStyleFrom(computedStyle),
                    ...useTypography(computedStyle),
                    width: "100%",
                    height: "100%"
                }}
                value={value ?? EMPTY_STRING}
                maxLength={maxLength}
                autoFocus={autoFocus}
                contextMenuHidden={contextMenuHidden}
                selection={selection}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                onSelectionChange={onSelectionChange}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyPress={onKeyPress}
            />
        </View>
    );
});

export type TextInput<TExtra extends object = object> = Omit<ReactNative.TextInput, keyof TExtra> & TExtra;

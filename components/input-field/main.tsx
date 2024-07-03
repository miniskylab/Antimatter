import {AllPropertiesMustPresent, EMPTY_STRING, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Text} from "@miniskylab/antimatter-text";
import {TextInput} from "@miniskylab/antimatter-text-input";
import {View} from "@miniskylab/antimatter-view";
import React, {forwardRef, JSX, MutableRefObject, useImperativeHandle, useMemo, useRef} from "react";
import {InputFieldContext, InputFieldProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export const InputField = forwardRef(function InputField(
    {
        style = Variant.Default,
        value = EMPTY_STRING,
        icon,
        placeholder = EMPTY_STRING,
        focusable = true,
        autoFocus = false,
        editable = true,
        isPasswordField = false,
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
    }: InputFieldProps,
    ref: MutableRefObject<InputField>
): JSX.Element
{
    const props: AllPropertiesMustPresent<InputFieldProps> = {
        style, value, icon, placeholder, focusable, autoFocus, editable, isPasswordField, contextMenuHidden, autoCorrect, maxLength,
        keyboardType, selection, onChangeText, onSelectionChange, onBlur, onFocus, onKeyPress
    };

    const context = useMemo<InputFieldContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle, imperativeHandles} = useComputedStyle(style, props);

    const internalRef = useRef<InputField>(null);
    useImperativeHandle(ref, () => ({...internalRef.current!, ...imperativeHandles}), []);

    return (
        <InputFieldContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {icon && <Icon style={computedStyle.AddOn} name={icon} pointerEvents={"none"}/>}
                <View style={computedStyle.Container}>
                    {!!placeholder && (
                        <Text style={computedStyle.Placeholder} pointerEvents={"none"}>
                            {placeholder}
                        </Text>
                    )}
                    <TextInput
                        ref={internalRef}
                        style={computedStyle.TextBox}
                        editable={editable}
                        focusable={focusable}
                        autoCorrect={autoCorrect}
                        secureTextEntry={isPasswordField}
                        value={value}
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
            </View>
        </InputFieldContext.Provider>
    );
});

export type InputField = TextInput;

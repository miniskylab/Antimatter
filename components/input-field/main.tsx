import {type AllPropertiesMustPresent, EMPTY_STRING, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {Text} from "@miniskylab/antimatter-text";
import {TextInput} from "@miniskylab/antimatter-text-input";
import {View} from "@miniskylab/antimatter-view";
import React, {forwardRef, JSX, MutableRefObject, useImperativeHandle, useRef} from "react";
import {InputFieldContext, InputFieldProps} from "./models";
import * as Variant from "./variants";

/**
 * A component that allows users to input text.
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

    const internalRef = useRef<InputField>(null);

    const context = useComponentContext<InputFieldContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle, imperativeHandles} = useComputedStyle(style, props);

    useImperativeHandle(ref, () => ({...internalRef.current!, ...imperativeHandles}), []);

    return (
        <InputFieldContext.Provider value={context}>
            <Pressable style={computedStyle.Root} tabIndex={-1} onPress={() => { internalRef.current?.focus(); }}>
                {icon && <Icon style={computedStyle.AddOn} name={icon} selectable={false}/>}
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
            </Pressable>
        </InputFieldContext.Provider>
    );
});

export type InputField = TextInput;

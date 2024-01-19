import {AllPropertiesMustPresent, EMPTY_STRING, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {TextInput} from "@miniskylab/antimatter-text-input";
import {View} from "@miniskylab/antimatter-view";
import React, {forwardRef, JSX, MutableRefObject, useMemo} from "react";
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
    const computedStyle = useComputedStyle(style, props);

    return (
        <InputFieldContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {icon && <Icon style={computedStyle.AddOn} name={icon} pointerEvents={"none"}/>}
                <View style={computedStyle.Container}>
                    {!!placeholder && (
                        <Label style={computedStyle.Placeholder} pointerEvents={"none"}>
                            {placeholder}
                        </Label>
                    )}
                    <TextInput
                        ref={ref}
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

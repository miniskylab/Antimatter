import {EMPTY_STRING} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {TextInput} from "@miniskylab/antimatter-text-input";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {InputFieldContext, InputFieldProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function InputField({
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
}: InputFieldProps): JSX.Element
{
    const props: Required<InputFieldProps> = {
        style, value, icon, placeholder, focusable, autoFocus, editable, isPasswordField, contextMenuHidden, autoCorrect, maxLength,
        keyboardType, selection, onChangeText, onSelectionChange, onBlur, onFocus, onKeyPress
    };

    const context = useMemo<InputFieldContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <InputFieldContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {icon && <Icon style={computedStyle.AddOn} name={icon}/>}
                <View style={computedStyle.Container}>
                    {!!placeholder && (
                        <Label style={computedStyle.Placeholder} pointerEvents={"none"}>
                            {placeholder}
                        </Label>
                    )}
                    <TextInput
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
}

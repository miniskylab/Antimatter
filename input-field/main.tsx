import {EMPTY_STRING, getFontFamily, inheritTextStyleFrom} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import React, {useMemo} from "react";
import {Animated, TextInput} from "react-native";
import {InputFieldContext, InputFieldProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function InputField({
    id,
    style = Variant.Default,
    onReadyToUnmount,
    value = EMPTY_STRING,
    icon,
    placeholder = EMPTY_STRING,
    autoFocus = false,
    isPasswordField = false,
    contextMenuHidden = false,
    autoCorrect = true,
    maxLength,
    keyboardType,
    selection,
    onChangeText,
    onSelectionChange,
    onBlur,
    onFocus,
    onKeyPress
}: InputFieldProps): JSX.Element
{
    const props: Required<InputFieldProps> = {
        id, style, onReadyToUnmount, value, icon, placeholder, autoFocus, isPasswordField, contextMenuHidden, autoCorrect, maxLength,
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
            <Animated.View style={computedStyle.Root}>
                {icon && <Icon style={computedStyle.AddOn} name={icon}/>}
                <Animated.View style={computedStyle.Container}>
                    {!!placeholder && (
                        <Label style={computedStyle.Placeholder} pointerEvents={"none"}>
                            {placeholder}
                        </Label>
                    )}
                    <Animated.View style={computedStyle.TextBox}>
                        <TextInput
                            autoCorrect={autoCorrect}
                            secureTextEntry={isPasswordField}
                            style={{
                                ...inheritTextStyleFrom(computedStyle.TextBox),
                                fontFamily: getFontFamily(computedStyle.TextBox),
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
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </InputFieldContext.Provider>
    );
}

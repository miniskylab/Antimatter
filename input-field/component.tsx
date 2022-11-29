import {EMPTY_STRING, getFontFamily, inheritTextStyleFrom} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import React from "react";
import {Animated, TextInput} from "react-native";
import {InputFieldProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function InputField({
    style = Variant.Default,
    value = EMPTY_STRING,
    icon,
    placeholder = EMPTY_STRING,
    autoFocus = false,
    isPasswordField = false,
    contextMenuHidden = false,
    keyboardType,
    selection,
    onChangeText,
    onSelectionChange,
    onBlur,
    onFocus,
    onKeyPress
}: InputFieldProps): JSX.Element
{
    const Style = style({
        value,
        icon,
        placeholder,
        autoFocus,
        isPasswordField,
        contextMenuHidden,
        keyboardType,
        selection,
        onChangeText,
        onSelectionChange,
        onBlur,
        onFocus,
        onKeyPress
    });

    return (
        <Animated.View style={Style.Root}>
            {icon && <Icon style={Style.AddOn} name={icon}/>}
            <Animated.View style={Style.Container}>
                {placeholder && (
                    <Label
                        style={Style.Placeholder}
                        pointerEvents={"none"}
                    >
                        {placeholder}
                    </Label>
                )}
                <Animated.View style={Style.TextBox}>
                    <TextInput
                        secureTextEntry={isPasswordField}
                        style={{
                            ...inheritTextStyleFrom(Style.TextBox),
                            fontFamily: getFontFamily(Style.TextBox),
                            width: "100%",
                            height: "100%"
                        }}
                        value={value ?? EMPTY_STRING}
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
    );
}

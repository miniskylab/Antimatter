import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {getFontFamily, inheritTextStyleFrom} from "@miniskylab/antimatter-model";
import React from "react";
import {Animated, TextInput} from "react-native";
import {InputFieldProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function InputField({
    style = Variant.Default,
    value = String.EMPTY,
    icon,
    placeholder,
    autoFocus = false,
    isPasswordField = false,
    onChange,
    onBlur,
    onFocus,
    onKeyPress
}: InputFieldProps): JSX.Element
{
    const Style = style({value, icon, placeholder, autoFocus, isPasswordField, onChange, onBlur, onFocus, onKeyPress});

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
                        value={value ?? ""}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onKeyPress={onKeyPress}
                        autoFocus={autoFocus}
                    />
                </Animated.View>
            </Animated.View>
        </Animated.View>
    );
}

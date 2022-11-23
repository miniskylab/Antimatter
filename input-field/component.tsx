import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {getFontFamily} from "@miniskylab/antimatter-model";
import React from "react";
import {TextInput, View} from "react-native";
import {InputFieldProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function InputField({
    style,
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
    const hasPlaceholderAndHasValue = placeholder && value;

    return (
        <View style={style.Root}>
            {icon && <Icon style={style.AddOn} name={icon}/>}
            <View style={style.Container}>
                {placeholder && (
                    <Label
                        style={hasPlaceholderAndHasValue ? style.Placeholder__Shrunk : style.Placeholder}
                        pointerEvents={"none"}
                    >
                        {placeholder}
                    </Label>
                )}
                <TextInput
                    secureTextEntry={isPasswordField}
                    style={{
                        ...hasPlaceholderAndHasValue ? style.TextBox__Shrunk : style.TextBox,
                        fontFamily: getFontFamily(style.TextBox)
                    }}
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyPress={onKeyPress}
                    autoFocus={autoFocus}
                />
            </View>
        </View>
    );
}

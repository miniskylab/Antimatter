import {EMPTY_STRING, inheritTextStyleFrom} from "@miniskylab/antimatter-framework";
import {getFontFamily, useTypography} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import * as ReactNative from "react-native";
import {TextInputProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function TextInput({
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
}: TextInputProps): JSX.Element
{
    const props: Required<TextInputProps> = {
        style, value, focusable, autoFocus, editable, secureTextEntry, contextMenuHidden, autoCorrect, maxLength, keyboardType, selection,
        onChangeText, onSelectionChange, onBlur, onFocus, onKeyPress
    };

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    const [fontsLoaded] = useTypography();
    if (!fontsLoaded)
    {
        return null;
    }

    return (
        <View style={() => computedStyle}>
            <ReactNative.TextInput
                editable={editable}
                focusable={focusable}
                autoCorrect={autoCorrect}
                secureTextEntry={secureTextEntry}
                style={{
                    ...inheritTextStyleFrom(computedStyle),
                    fontFamily: getFontFamily(computedStyle),
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
}

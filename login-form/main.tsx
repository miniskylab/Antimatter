import {Button} from "@miniskylab/antimatter-button";
import {AllPropertiesMustPresent, EMPTY_STRING, Style} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo, useState} from "react";
import {LoginFormContext, LoginFormProps, LoginFormState} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function LoginForm({
    style = Variant.Default,
    logo,
    title,
    subtitle,
    usernameInputField,
    passwordInputField,
    loginButton,
    onLogin
}: LoginFormProps): JSX.Element
{
    const props: AllPropertiesMustPresent<LoginFormProps> = {
        style, logo, title, subtitle, usernameInputField, passwordInputField, loginButton, onLogin
    };

    const [state, setState] = useState<LoginFormState>({
        username: EMPTY_STRING,
        password: EMPTY_STRING
    });

    const context = useMemo<LoginFormContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    const computedStyle = Style.useComputedStyle(style, props, state);

    return (
        <LoginFormContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Icon style={computedStyle.Logo} name={logo}/>
                <Label style={computedStyle.Title}>{title}</Label>
                <Label style={computedStyle.Subtitle}>{subtitle}</Label>
                <InputField
                    style={computedStyle.InputField}
                    icon={usernameInputField.icon}
                    placeholder={usernameInputField.placeholder}
                    value={state.username}
                    onChangeText={newValue => { setState(prevState => ({...prevState, username: newValue})); }}
                />
                <InputField
                    style={computedStyle.InputField}
                    icon={passwordInputField.icon}
                    placeholder={passwordInputField.placeholder}
                    isPasswordField={true}
                    value={state.password}
                    onChangeText={newValue => { setState(prevState => ({...prevState, password: newValue})); }}
                />
                <Button
                    style={computedStyle.LoginButton}
                    label={loginButton.label}
                    disabled={!state.username || !state.password}
                    onPress={() => { onLogin?.(state.username, state.password); }}
                />
            </View>
        </LoginFormContext.Provider>
    );
}

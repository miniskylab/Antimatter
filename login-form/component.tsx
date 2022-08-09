import {Button} from "@miniskylab/antimatter-button";
import {Icon} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import React, {useState} from "react";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    variant = Variant.Default,
    logo,
    titleLabel,
    descriptionLabel,
    usernameInputField,
    passwordInputField,
    loginButton,
    onLogin
}: Props): JSX.Element
{
    const [username, setUsername] = useState(String.EMPTY);
    const [password, setPassword] = useState(String.EMPTY);

    return (
        <div className={variant["login-form"]}>
            <Icon className={variant["login-form__logo"]} iconName={logo}/>
            <Label variant={titleLabel.variant ?? Variant.Label.Title} text={titleLabel.text}/>
            <Label variant={descriptionLabel.variant ?? Variant.Label.Description} text={descriptionLabel.text}/>
            <InputField
                variant={usernameInputField.variant ?? Variant.InputField.Username}
                icon={usernameInputField.icon}
                placeholderText={usernameInputField.placeholderText}
                value={username}
                onChange={newValue => { setUsername(newValue); }}
            />
            <InputField
                variant={passwordInputField.variant ?? Variant.InputField.Password}
                icon={passwordInputField.icon}
                placeholderText={passwordInputField.placeholderText}
                isPasswordField={true}
                value={password}
                onChange={newValue => { setPassword(newValue); }}
            />
            <Button
                variant={loginButton.variant ?? Variant.Button.Login}
                text={loginButton.text}
                disabled={!username || !password}
                onClick={() => { onLogin(username, password); }}
            />
        </div>
    );
}

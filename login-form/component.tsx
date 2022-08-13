import {Button} from "@miniskylab/antimatter-button";
import {Icon} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import React, {useState} from "react";
import {LoginFormProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function LoginForm({
    className = "login-form",
    logo,
    title,
    description,
    usernameInputField,
    passwordInputField,
    loginButton,
    onLogin
}: LoginFormProps): JSX.Element
{
    const [username, setUsername] = useState(String.EMPTY);
    const [password, setPassword] = useState(String.EMPTY);

    return (
        <div className={className}>
            <Icon className={`${className}__logo`} {...logo}/>
            <Label className={`${className}__title`} {...title}/>
            <Label className={`${className}__description`} {...description}/>
            <InputField
                className={`${className}__username-input-field`}
                icon={usernameInputField.icon}
                placeholder={usernameInputField.placeholder}
                value={username}
                onChange={newValue => { setUsername(newValue); }}
            />
            <InputField
                className={`${className}__password-input-field`}
                icon={passwordInputField.icon}
                placeholder={passwordInputField.placeholder}
                isPasswordField={true}
                value={password}
                onChange={newValue => { setPassword(newValue); }}
            />
            <Button
                className={`${className}__login-button`}
                label={loginButton.label}
                disabled={!username || !password}
                onClick={() => { onLogin(username, password); }}
            />
        </div>
    );
}

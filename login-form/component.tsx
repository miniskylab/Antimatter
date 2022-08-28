import {Button} from "@miniskylab/antimatter-button";
import {Icon} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React, {useState} from "react";
import {LoginFormProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function LoginForm({
    className,
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
        <div className={bem(className)}>
            <Icon className={bem("LoginForm-Logo")} name={logo}/>
            <Label className={bem("LoginForm-Title")} text={title}/>
            <Label className={bem("LoginForm-Description")} text={description}/>
            <InputField
                className={bem("LoginForm-InputField")}
                icon={usernameInputField.icon}
                placeholder={usernameInputField.placeholder}
                value={username}
                onChange={newValue => { setUsername(newValue); }}
            />
            <InputField
                className={bem("LoginForm-InputField")}
                icon={passwordInputField.icon}
                placeholder={passwordInputField.placeholder}
                isPasswordField={true}
                value={password}
                onChange={newValue => { setPassword(newValue); }}
            />
            <Button
                className={bem("LoginForm-LoginButton")}
                label={loginButton.label}
                disabled={!username || !password}
                onClick={() => { onLogin(username, password); }}
            />
        </div>
    );
}

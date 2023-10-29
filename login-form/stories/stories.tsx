import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {LoginForm} from "../main";
import {LoginFormProps} from "../models";
import * as Variant from "../variants";

const LoginFormWithValidation = withValidation(LoginForm, LoginFormProps);
export default {
    component: LoginForm,
    title: "Components/Login Form"
} satisfies Meta<typeof LoginForm>;
type Story = StoryObj<typeof LoginForm>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        logo: Sb.enumDropdown(DefaultIconSet),
        usernameInputField: Sb.locked,
        passwordInputField: Sb.locked,
        loginButton: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        logo: DefaultIconSet.LockInsideShield,
        title: "MiniSkyLab Gatekeeper",
        subtitle: "Enter your credentials below",
        usernameInputField: {icon: DefaultIconSet.User, placeholder: "Username"},
        passwordInputField: {icon: DefaultIconSet.Lock, placeholder: "Password"},
        loginButton: {label: "Login"},
        onLogin: (username, password) => { alert(`Username: ${username} - Password: ${password}`); }
    },
    render: args => <LoginFormWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

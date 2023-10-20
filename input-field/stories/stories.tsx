import {EMPTY_STRING, Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {InputField} from "../main";
import {InputFieldProps} from "../models";
import * as Variant from "./variants";

const InputFieldWithValidation = withValidation(InputField, InputFieldProps);
export default {
    component: InputField,
    title: "Components/Input Field",
    render: args =>
    {
        const [, setArgs] = useArgs<InputFieldProps>();
        return (
            <InputFieldWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style, args.autoFocus])}
                onChangeText={value => { setArgs({value}); }}
            />
        );
    }
} satisfies Meta<typeof InputField>;
type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        icon: Sb.enumDropdown(DefaultIconSet),
        selection: Sb.locked,
        onBlur: Sb.locked,
        onFocus: Sb.locked,
        onKeyPress: Sb.locked,
        onSelectionChange: Sb.locked,
        onChangeText: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.FixedWidth),
        placeholder: "Placeholder",
        icon: DefaultIconSet.Sun,
        value: EMPTY_STRING,
        focusable: true,
        autoFocus: false,
        editable: true,
        isPasswordField: false,
        contextMenuHidden: false,
        autoCorrect: true,
        keyboardType: "default"
    }
};

export const Prefilled: Story = {
    args: {
        style: Variant.FixedWidth,
        value: "Hello World"
    }
};

export const Placeholder: Story = {
    args: {
        style: Variant.FixedWidth,
        placeholder: "Placeholder"
    }
};

export const PasswordField: Story = {
    args: {
        style: Variant.FixedWidth,
        placeholder: "Password Field",
        isPasswordField: true,
        value: "this is a very important secret"
    }
};

export const WithAddon: Story = {
    args: {
        style: Variant.FixedWidth,
        icon: DefaultIconSet.Sun
    }
};

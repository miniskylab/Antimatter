import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {LocalAuthenticationStatus} from "../enums";
import {LocalAuthenticationForm} from "../main";
import {LocalAuthenticationFormProps} from "../models";
import * as Variant from "../variants";

const LocalAuthenticationFormWithValidation = withValidation(LocalAuthenticationForm, LocalAuthenticationFormProps);
export default {
    component: LocalAuthenticationForm,
    title: "Components/Local Authentication Form"
} satisfies Meta<typeof LocalAuthenticationForm>;
type Story = StoryObj<typeof LocalAuthenticationForm>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        title: Sb.text(),
        subtitle: Sb.text(),
        icon: Sb.enumDropdown(DefaultIconSet),
        localAuthenticationStatus: Sb.enumDropdown(LocalAuthenticationStatus),
        onPrompt: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        title: "Face ID Access Required",
        subtitle: "Tap the Face icon to go to Settings and grant<br/>MiniSkyLab permission to use Face ID",
        icon: DefaultIconSet.FaceID,
        localAuthenticationStatus: LocalAuthenticationStatus.Unknown,
        onPrompt: () => { alert("Prompted!"); }
    },
    render: args => <LocalAuthenticationFormWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

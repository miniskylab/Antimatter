import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {LocalAuthenticationStatus} from "../enums";
import {LocalAuthenticationPrompt} from "../main";
import {LocalAuthenticationPromptProps} from "../models";
import * as Variant from "../variants";

const LocalAuthenticationPromptWithValidation = withValidation(LocalAuthenticationPrompt, LocalAuthenticationPromptProps);
export default {
    component: LocalAuthenticationPrompt,
    title: "Components/Local Authentication Prompt"
} satisfies Meta<typeof LocalAuthenticationPrompt>;
type Story = StoryObj<typeof LocalAuthenticationPrompt>;

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
    render: args => <LocalAuthenticationPromptWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

import {Footer, FooterProps} from "@miniskylab/antimatter-footer";
import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import * as Variant from "./variants";

const FooterWithValidation = withValidation(Footer, FooterProps);
export default {
    component: Footer,
    title: "Components/Footer",
    parameters: {status: {type: [Sb.Badge.IOS, Sb.Badge.Web]}}
} satisfies Meta<typeof Footer>;
type Story = StoryObj<typeof Footer>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant)
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    render: args => <FooterWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

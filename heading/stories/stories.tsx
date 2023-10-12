import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {Heading, HeadingProps} from "@miniskylab/antimatter-heading";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import * as Variant from "./variants";

const HeadingWithValidation = withValidation(Heading, HeadingProps);
export default {
    component: Heading,
    title: "Components/Heading",
    parameters: {status: {type: [Sb.Badge.IOS, Sb.Badge.Web]}}
} satisfies Meta<typeof Heading>;
type Story = StoryObj<typeof Heading>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant)
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        title: "Lorem Ipsum",
        subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse massa tellus, commodo eu leo sit amet"
    },
    render: args => <HeadingWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

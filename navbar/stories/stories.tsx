import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {Navbar, NavbarProps} from "@miniskylab/antimatter-navbar";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TestData} from "./test-data";
import * as Variant from "./variants";

const NavbarWithValidation = withValidation(Navbar, NavbarProps);
export default {
    component: Navbar,
    title: "Components/Navigation Bar",
    parameters: {status: {type: [Sb.Badge.IOS, Sb.Badge.Web]}}
} satisfies Meta<typeof Navbar>;
type Story = StoryObj<typeof Navbar>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        tabs: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        tabs: TestData.getTabs()
    },
    render: args => <NavbarWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Navbar} from "../main";
import {NavbarProps} from "../models";
import * as Variant from "../variants";
import {TestData} from "./test-data";

const NavbarWithValidation = withValidation(Navbar, NavbarProps);
export default {
    component: Navbar,
    title: "Components/Navigation Bar"
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

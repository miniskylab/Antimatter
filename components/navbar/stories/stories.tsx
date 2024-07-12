import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Navbar} from "../main";
import {NavbarProps} from "../models";
import * as Variant from "../variants";
import {TestData} from "./test-data";

const NavbarWithValidation = withValidation(Navbar, NavbarProps);
export default {
    component: Navbar,
    title: "Components/Navigation Bar",
    render: args => <NavbarWithValidation {...args} tabs={TestData.getTabs()} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
} satisfies Meta<typeof Navbar>;
type Story = StoryObj<typeof Navbar>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        tabs: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default)
    }
};

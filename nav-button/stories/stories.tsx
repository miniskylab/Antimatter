import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Target} from "../enums";
import {NavButton} from "../main";
import {NavButtonProps} from "../models";
import * as Variant from "../variants";

const NavButtonWithValidation = withValidation(NavButton, NavButtonProps);
export default {
    component: NavButton,
    title: "Components/Navigation Button"
} satisfies Meta<typeof NavButton>;
type Story = StoryObj<typeof NavButton>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        icon: Sb.enumDropdown(DefaultIconSet),
        openIn: Sb.enumDropdown(Target),
        destination: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        destination: "/",
        openIn: Target.SameWindowOrTab,
        label: "Navigate to home page",
        icon: DefaultIconSet.ChevronRight,
        isHighlighted: false
    },
    render: args => <NavButtonWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

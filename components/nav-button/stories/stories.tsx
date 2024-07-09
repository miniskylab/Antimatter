import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Target} from "../enums";
import {NavButton} from "../main";
import {NavButtonProps} from "../models";
import * as Variant from "../variants";

export default {component: NavButton, title: "Components/Navigation Button"} satisfies Meta<typeof NavButton>;
type Story = StoryObj<typeof NavButton>;

const NavButtonWithValidation = withValidation(NavButton, NavButtonProps);
export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        destination: Sb.locked,
        openIn: Sb.enumDropdown(Target),
        label: Sb.text(),
        icon: Sb.enumDropdown(DefaultIconSet),
        disabled: Sb.boolean()
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        destination: "/",
        openIn: Target.SameWindowOrTab,
        label: "Navigate to home page",
        icon: DefaultIconSet.ChevronRight,
        disabled: false
    },
    render: args => <NavButtonWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

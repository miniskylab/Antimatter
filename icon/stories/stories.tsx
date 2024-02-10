import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Icon} from "../main";
import {IconProps} from "../models";
import * as Variant from "./variants";

const IconWithValidation = withValidation(Icon, IconProps);
export default {
    component: Icon,
    title: "Components/Icon"
} satisfies Meta<typeof Icon>;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        name: Sb.enumDropdown(DefaultIconSet),
        pointerEvents: Sb.select(),
        selectable: Sb.boolean()
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Inflated),
        name: DefaultIconSet.Sun,
        pointerEvents: "auto",
        selectable: true
    },
    render: args => <IconWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

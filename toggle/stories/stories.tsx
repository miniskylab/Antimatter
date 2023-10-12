import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {Status, Toggle, ToggleProps} from "@miniskylab/antimatter-toggle";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import * as Variant from "./variants";

const ToggleWithValidation = withValidation(Toggle, ToggleProps);
export default {
    component: Toggle,
    title: "Components/Toggle",
    parameters: {status: {type: [Sb.Badge.IOS, Sb.Badge.Web]}}
} satisfies Meta<typeof Toggle>;
type Story = StoryObj<typeof Toggle>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        status: Sb.enumDropdown(Status),
        icon: Sb.enumDropdown(DefaultIconSet)
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        status: Status.Unchecked,
        icon: DefaultIconSet.Circle
    },
    render: args =>
    {
        const [, setArgs] = useArgs<ToggleProps>();
        return (
            <ToggleWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                onChange={newStatus => { setArgs({status: newStatus}); }}
            />
        );
    }
};

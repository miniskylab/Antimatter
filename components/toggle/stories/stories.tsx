import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {useArgs} from "storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Status} from "../enums";
import {Toggle} from "../main";
import {ToggleProps} from "../models";
import * as Variant from "../variants";

export default {component: Toggle, title: "Components/Toggle"} satisfies Meta<typeof Toggle>;
type Story = StoryObj<typeof Toggle>;

const ToggleWithValidation = withValidation(Toggle, ToggleProps);
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

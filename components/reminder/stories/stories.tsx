import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Reminder} from "../main";
import {ReminderProps} from "../models";
import * as Variant from "../variants";

const ReminderWithValidation = withValidation(Reminder, ReminderProps);
export default {
    component: Reminder,
    title: "Components/Reminder",
    render: args =>
    {
        return (
            <ReminderWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
            />
        );
    }
} satisfies Meta<typeof Reminder>;
type Story = StoryObj<typeof Reminder>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant)
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default)
    }
};

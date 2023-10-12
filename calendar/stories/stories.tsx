import {Calendar, CalendarProps} from "@miniskylab/antimatter-calendar";
import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import * as Variant from "./variants";

const CalendarWithValidation = withValidation(Calendar, CalendarProps);
export default {
    component: Calendar,
    title: "Components/Calendar",
    parameters: {status: {type: [Sb.Badge.IOS, Sb.Badge.Web]}},
    render: args =>
    {
        const [, setArgs] = useArgs<CalendarProps>();
        return (
            <CalendarWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                onSelectedDateChange={newlySelectedDate => { setArgs({selectedDate: newlySelectedDate}); }}
            />
        );
    }
} satisfies Meta<typeof Calendar>;
type Story = StoryObj<typeof Calendar>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        selectedDate: Sb.datePicker(),
        onSelectedDateChange: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default)
    }
};

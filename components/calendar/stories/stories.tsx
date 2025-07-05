import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {useArgs} from "storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Calendar} from "../main";
import {CalendarProps} from "../models";
import * as Variant from "../variants";

const CalendarWithValidation = withValidation(Calendar, CalendarProps);
export default {
    component: Calendar,
    title: "Components/Calendar",
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

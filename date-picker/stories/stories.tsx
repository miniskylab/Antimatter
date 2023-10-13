import {DateFormat, Sb, withValidation} from "@miniskylab/antimatter-framework";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {DatePicker} from "../main";
import {DatePickerProps} from "../models";
import * as Variant from "../variants";

const DatePickerWithValidation = withValidation(DatePicker, DatePickerProps);
export default {
    component: DatePicker,
    title: "Components/Date Picker",
    parameters: {status: {type: [Sb.Badge.IOS, Sb.Badge.Web]}},
    render: args =>
    {
        const [, setArgs] = useArgs<DatePickerProps>();
        return (
            <DatePickerWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                onAddonPress={() => { setArgs({calendarIsOpen: !args.calendarIsOpen}); }}
                onSelectedDateChange={newlySelectedDate => { setArgs({selectedDate: newlySelectedDate}); }}
            />
        );
    }
} satisfies Meta<typeof DatePicker>;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        dateFormat: Sb.enumDropdown(DateFormat),
        selectedDate: Sb.datePicker(),
        autoFocus: Sb.locked,
        editable: Sb.locked,
        focusable: Sb.locked,
        onAddonPress: Sb.locked,
        onSelectedDateChange: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        placeholder: "DD / MM / YYYY",
        selectedDate: undefined,
        dateFormat: DateFormat.Short,
        calendarIsOpen: false
    }
};

export const Prefilled: Story = {
    args: {
        style: Variant.Default,
        selectedDate: new Date(1993, 1, 25)
    }
};

export const Placeholder: Story = {
    args: {
        style: Variant.Default,
        placeholder: "DD / MM / YYYY"
    }
};

export const Format: Story = {
    args: {
        style: Variant.Default,
        dateFormat: DateFormat.Full,
        selectedDate: new Date(1993, 1, 25)
    }
};

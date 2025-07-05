import {DateFormat, withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {useArgs} from "storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {DatePicker} from "../main";
import {DatePickerProps} from "../models";
import * as Variant from "../variants";

const DatePickerWithValidation = withValidation(DatePicker, DatePickerProps);
export default {
    component: DatePicker,
    title: "Components/Date Picker",
    render: args =>
    {
        const [, setArgs] = useArgs<DatePickerProps>();
        return (
            <DatePickerWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                onAddonPress={() => { setArgs({isCalendarOpen: !args.isCalendarOpen}); }}
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
        placeholder: Sb.text(),
        selectedDate: Sb.datePicker(),
        isCalendarOpen: Sb.boolean(),
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
        isCalendarOpen: false
    }
};

export const Prefilled: Story = {
    tags: ["hidden-from-sidebar"],
    args: {
        style: Variant.Default,
        selectedDate: new Date(1993, 1, 25)
    }
};

export const Placeholder: Story = {
    tags: ["hidden-from-sidebar"],
    args: {
        style: Variant.Default,
        placeholder: "DD / MM / YYYY"
    }
};

export const Format: Story = {
    tags: ["hidden-from-sidebar"],
    args: {
        style: Variant.Default,
        dateFormat: DateFormat.Full,
        selectedDate: new Date(1993, 1, 25)
    }
};

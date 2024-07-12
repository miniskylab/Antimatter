import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {RangeSlider} from "../main";
import {RangeSliderProps} from "../models";
import * as Variant from "./variants";

const RangeSliderWithValidation = withValidation(RangeSlider, RangeSliderProps);
export default {
    component: RangeSlider,
    title: "Components/Range Slider",
    render: args =>
    {
        const [, setArgs] = useArgs<RangeSliderProps>();
        return (
            <RangeSliderWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                onChange={newValue => { setArgs({value: newValue}); }}
            />
        );
    }
} satisfies Meta<typeof RangeSlider>;
type Story = StoryObj<typeof RangeSlider>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        minValue: Sb.number(),
        maxValue: Sb.number(),
        value: Sb.number(),
        disabled: Sb.boolean(),
        knobIcon: Sb.enumDropdown(DefaultIconSet),
        pipsSettings: Sb.locked,
        onChange: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        minValue: 10000,
        maxValue: 1000000,
        value: 550000,
        disabled: false,
        knobIcon: DefaultIconSet.Circle,
        pipsSettings: {
            step: 10000,
            milestoneStep: 90000
        }
    }
};

export const SnapToPip: Story = {
    tags: ["hidden-from-sidebar"],
    args: {
        style: Variant.Default,
        minValue: 0,
        maxValue: 10,
        value: 5,
        pipsSettings: {
            step: 0.5,
            milestoneStep: 1,
            canSnapToPip: true
        }
    }
};

export const ColorStack: Story = {
    tags: ["hidden-from-sidebar"],
    args: {
        style: Variant.ColorStack,
        minValue: 0,
        maxValue: 1,
        value: 0.5,
        pipsSettings: {
            step: 0.01,
            milestoneStep: 0.1
        }
    }
};

export const WithoutPips: Story = {
    tags: ["hidden-from-sidebar"],
    args: {
        style: Variant.Default,
        minValue: 0,
        maxValue: 10,
        value: 5
    }
};

export const ProgressBar: Story = {
    tags: ["hidden-from-sidebar"],
    args: {
        style: Variant.Default,
        minValue: 0,
        maxValue: 100,
        value: 50,
        disabled: true
    }
};

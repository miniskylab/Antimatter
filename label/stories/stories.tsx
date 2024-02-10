import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Label} from "../main";
import {LabelProps} from "../models";
import * as Variant from "./variants";

const LabelWithValidation = withValidation(Label, LabelProps);
export default {
    component: Label,
    title: "Components/Label"
} satisfies Meta<typeof Label>;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        children: Sb.text(),
        pointerEvents: Sb.select(),
        selectable: Sb.boolean(),
        numberOfLines: Sb.number(0)
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        children: "lorem ipsum",
        pointerEvents: "auto",
        selectable: true,
        numberOfLines: 0
    },
    render: args => <LabelWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

export const StyleWeightAndDecoration: Story = {
    tags: ["hidden-from-sidebar"],
    render: () => (
        <>
            <Label style={Variant.Bold}>Bold</Label>
            <Label style={Variant.Italic}>Italic</Label>
            <Label style={Variant.Underline}>Underline</Label>
            <Label style={Variant.LineThrough}>Line through</Label>
            <Label style={Variant.UnderlineLineThrough}>Underline - Line through</Label>
            <Label style={Variant.BoldItalicUnderline}>Bold - Italic - Underline</Label>
        </>
    )
};

export const Size: Story = {
    tags: ["hidden-from-sidebar"],
    render: () => (
        <>
            <Label style={Variant.Small}>Small</Label>
            <Label style={Variant.Medium}>Medium</Label>
            <Label style={Variant.Large}>Large</Label>
        </>
    )
};

export const Badge: Story = {
    tags: ["hidden-from-sidebar"],
    render: () => (
        <>
            <Label style={Variant.PrimaryBadge}>1</Label>
            <Label style={Variant.PositiveBadge}>9+</Label>
            <Label style={Variant.WarningBadge}>99+</Label>
            <Label style={Variant.NegativeBadge}>999+</Label>
            <Label style={Variant.RectangularBadge}>Rectangle</Label>
            <Label style={Variant.OutlinedRectangularBadge}>Outlined Rectangle</Label>
            <Label style={Variant.OutlinedBadge}>Outlined Capsule</Label>
        </>
    )
};

import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Text} from "../main";
import {TextProps} from "../models";
import * as Variant from "./variants";

export default {component: Text, title: "Components/Text"} satisfies Meta<typeof Text>;
type Story = StoryObj<typeof Text>;

const TextWithValidation = withValidation(Text, TextProps);
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
    render: args => <TextWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

export const StyleWeightAndDecoration: Story = {
    tags: ["hidden-from-sidebar"],
    render: () => (
        <>
            <Text style={Variant.Bold}>Bold</Text>
            <Text style={Variant.Italic}>Italic</Text>
            <Text style={Variant.Underline}>Underline</Text>
            <Text style={Variant.LineThrough}>Line through</Text>
            <Text style={Variant.UnderlineLineThrough}>Underline - Line through</Text>
            <Text style={Variant.BoldItalicUnderline}>Bold - Italic - Underline</Text>
        </>
    )
};

export const Size: Story = {
    tags: ["hidden-from-sidebar"],
    render: () => (
        <>
            <Text style={Variant.Small}>Small</Text>
            <Text style={Variant.Medium}>Medium</Text>
            <Text style={Variant.Large}>Large</Text>
        </>
    )
};

export const Badge: Story = {
    tags: ["hidden-from-sidebar"],
    render: () => (
        <>
            <Text style={Variant.PrimaryBadge}>1</Text>
            <Text style={Variant.PositiveBadge}>9+</Text>
            <Text style={Variant.WarningBadge}>99+</Text>
            <Text style={Variant.NegativeBadge}>999+</Text>
            <Text style={Variant.RectangularBadge}>Rectangle</Text>
            <Text style={Variant.OutlinedRectangularBadge}>Outlined Rectangle</Text>
            <Text style={Variant.OutlinedBadge}>Outlined Capsule</Text>
        </>
    )
};

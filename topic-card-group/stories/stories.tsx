import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {Target} from "@miniskylab/antimatter-nav-button";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TopicCardGroup} from "../main";
import {TopicCardGroupProps} from "../models";
import * as Variant from "../variants";
import * as StaticAsset from "./static-assets";

const TopicCardGroupWithValidation = withValidation(TopicCardGroup, TopicCardGroupProps);
export default {
    component: TopicCardGroup,
    title: "Components/Topic Card Group"
} satisfies Meta<typeof TopicCardGroup>;
type Story = StoryObj<typeof TopicCardGroup>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        cards: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.FourColumns),
        cards: [
            {
                illustration: {type: "icon", iconName: DefaultIconSet.NoMic},
                title: "Lorem ipsum",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tortor purus, consequat ac aliquam at, " +
                             "accumsan sit amet quam. Duis finibus nunc ut lectus ornare, at consectetur massa suscipit.",
                ctas: [
                    {label: "Lorem ipsum", icon: DefaultIconSet.ChevronRight, destination: "#cta", openIn: Target.SameFrame},
                    {label: "Lorem ipsum", icon: DefaultIconSet.ChevronRight, destination: "#cta", openIn: Target.SameFrame}
                ]
            },
            {
                illustration: {type: "icon", iconName: DefaultIconSet.Warning},
                title: "Nullam",
                description: "Nullam tincidunt metus eros, ac pharetra ante porttitor nec. Praesent in sollicitudin risus. " +
                             "Vestibulum id mattis mauris. Mauris elementum suscipit augue, at blandit nibh vulputate ac.",
                ctas: [
                    {label: "Lorem ipsum", icon: DefaultIconSet.NewTab, destination: "#cta", openIn: Target.NewWindowOrTab},
                    {label: "Lorem ipsum", icon: DefaultIconSet.NewTab, destination: "#cta", openIn: Target.NewWindowOrTab}
                ]
            },
            {
                illustration: {type: "icon", iconName: DefaultIconSet.Flag},
                title: "Nunc in lacus",
                description: "Vestibulum ut justo urna. Etiam a risus eget est egestas consequat ut sit amet elit. Sed hendrerit, " +
                             "elit ut pellentesque vestibulum, justo nisi eleifend arcu, porttitor varius libero nibh ut dolor.",
                ctas: [
                    {label: "Lorem ipsum", icon: DefaultIconSet.ChevronRight, destination: "#cta", openIn: Target.SameFrame},
                    {label: "Lorem ipsum", icon: DefaultIconSet.NewTab, destination: "#cta", openIn: Target.NewWindowOrTab}
                ]
            },
            {
                illustration: {type: "icon", iconName: DefaultIconSet.Sun},
                title: "Curabitur",
                description: "Pellentesque pellentesque purus sit amet iaculis rutrum. Nam vitae neque et enim aliquet dignissim eget " +
                             "ornare nibh. Vestibulum elementum felis diam, in viverra lacus rutrum at mattis porttitor.",
                ctas: [
                    {label: "Lorem ipsum", destination: "#cta", openIn: Target.SameFrame}
                ]
            },
            {
                illustration: {type: "image", alt: "nullam", source: StaticAsset.PlaceholderImage},
                title: "Nullam",
                description: "Nullam tincidunt metus eros, ac pharetra ante porttitor nec. Praesent in sollicitudin risus. Vestibulum id " +
                             "mattis mauris. Mauris elementum suscipit. Nam blandit non metus vel tincidunt."
            },
            {
                thisIsPlaceholderCard: true
            },
            {
                thisIsPlaceholderCard: true
            },
            {
                thisIsPlaceholderCard: true
            }
        ]
    },
    render: args => (
        <div style={{zoom: 0.8}}>
            <TopicCardGroupWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
            />
        </div>
    )
};

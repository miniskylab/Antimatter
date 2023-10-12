import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {Card, TopicCardGroup, TopicCardGroupProps} from "@miniskylab/antimatter-topic-card-group";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import * as StaticAsset from "./static-assets";
import * as Variant from "./variants";

const TopicCardGroupWithValidation = withValidation(TopicCardGroup, TopicCardGroupProps);
export default {
    component: TopicCardGroup,
    title: "Components/Topic Card Group",
    parameters: {status: {type: [Sb.Badge.IOS, Sb.Badge.Web]}}
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
                    {label: "Lorem ipsum", icon: DefaultIconSet.ChevronRight, href: "#cta", openIn: Card.CtaTarget.SameWindowOrTab},
                    {label: "Lorem ipsum", icon: DefaultIconSet.ChevronRight, href: "#cta", openIn: Card.CtaTarget.SameWindowOrTab}
                ]
            },
            {
                illustration: {type: "icon", iconName: DefaultIconSet.Warning},
                title: "Nullam",
                description: "Nullam tincidunt metus eros, ac pharetra ante porttitor nec. Praesent in sollicitudin risus. " +
                             "Vestibulum id mattis mauris. Mauris elementum suscipit augue, at blandit nibh vulputate ac.",
                ctas: [
                    {label: "Lorem ipsum", icon: DefaultIconSet.NewTab, href: "#cta", openIn: Card.CtaTarget.NewWindowOrTab},
                    {label: "Lorem ipsum", icon: DefaultIconSet.NewTab, href: "#cta", openIn: Card.CtaTarget.NewWindowOrTab}
                ]
            },
            {
                illustration: {type: "icon", iconName: DefaultIconSet.Flag},
                title: "Nunc in lacus",
                description: "Vestibulum ut justo urna. Etiam a risus eget est egestas consequat ut sit amet elit. Sed hendrerit, " +
                             "elit ut pellentesque vestibulum, justo nisi eleifend arcu, porttitor varius libero nibh ut dolor.",
                ctas: [
                    {label: "Lorem ipsum", icon: DefaultIconSet.ChevronRight, href: "#cta", openIn: Card.CtaTarget.SameWindowOrTab},
                    {label: "Lorem ipsum", icon: DefaultIconSet.NewTab, href: "#cta", openIn: Card.CtaTarget.NewWindowOrTab}
                ]
            },
            {
                illustration: {type: "icon", iconName: DefaultIconSet.Sun},
                title: "Curabitur",
                description: "Pellentesque pellentesque purus sit amet iaculis rutrum. Nam vitae neque et enim aliquet dignissim eget " +
                             "ornare nibh. Vestibulum elementum felis diam, in viverra lacus rutrum at mattis porttitor.",
                ctas: [
                    {label: "Lorem ipsum", href: "#cta", openIn: Card.CtaTarget.SameWindowOrTab}
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

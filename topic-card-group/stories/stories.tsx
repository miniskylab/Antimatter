import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {Target} from "@miniskylab/antimatter-nav-button";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TopicCardGroup} from "../main";
import {TopicCardGroupProps} from "../models";
import * as Variant from "../variants";
import * as StaticAsset from "./static-assets";
import {TestData} from "./test-data";

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
                wysiwyg: `
                    <div ${TestData.wysiwygStyles.icon}></div>
                    <div ${TestData.wysiwygStyles.title}>Lorem ipsum</div>
                    <p ${TestData.wysiwygStyles.paragraph}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tortor purus, consequat ac aliquam at, accumsan sit
                        amet quam. Duis finibus nunc ut lectus ornare, at consectetur massa suscipit.
                    </p>
                `,
                ctas: [
                    {label: "Lorem ipsum", icon: DefaultIconSet.ChevronRight, destination: "#cta", openIn: Target.SameFrame},
                    {label: "Lorem ipsum", icon: DefaultIconSet.ChevronRight, destination: "#cta", openIn: Target.SameFrame}
                ]
            },
            {
                wysiwyg: `
                    <img ${TestData.wysiwygStyles.image} src="${StaticAsset.PlaceholderImage}"/>
                    <div ${TestData.wysiwygStyles.title}>Nullam</div>
                    <p ${TestData.wysiwygStyles.paragraph}>
                        Nullam tincidunt metus eros, ac pharetra ante porttitor nec. Praesent in sollicitudin risus. Vestibulum id mattis
                        mauris. Mauris elementum suscipit. Nam blandit non metus vel tincidunt.
                    </p>
                `,
                ctas: [
                    {label: "Lorem ipsum", icon: DefaultIconSet.NewTab, destination: "#cta", openIn: Target.NewWindowOrTab},
                    {label: "Lorem ipsum", icon: DefaultIconSet.NewTab, destination: "#cta", openIn: Target.NewWindowOrTab}
                ]
            },
            {
                wysiwyg: `
                    <div ${TestData.wysiwygStyles.icon}></div>
                    <div ${TestData.wysiwygStyles.title}>Nunc in lacus</div>
                    <p ${TestData.wysiwygStyles.paragraph}>
                        Vestibulum ut justo urna. Etiam a risus eget est egestas consequat ut sit amet elit. Sed hendrerit, elit ut
                        pellentesque vestibulum, justo nisi eleifend arcu, porttitor varius libero nibh ut dolor.
                    </p>
                `,
                ctas: [
                    {label: "Lorem ipsum", destination: "#cta", openIn: Target.SameFrame}
                ]
            },
            {
                wysiwyg: `
                    <div ${TestData.wysiwygStyles.icon}></div>
                    <div ${TestData.wysiwygStyles.title}>Curabitur</div>
                    <p ${TestData.wysiwygStyles.paragraph}>
                        Pellentesque pellentesque purus sit amet iaculis rutrum. Nam vitae neque et enim aliquet dignissim eget ornare nibh.
                        Vestibulum elementum felis diam, in viverra lacus rutrum at mattis porttitor.
                    </p>
                `
            },
            {
                wysiwyg: `
                    <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center;">
                        <b class="text-color--gold" style="font-size: 90px; line-height: 70px;">A+</b>
                        <b style="font-size: 24px; line-height: 36px; flex-basis: 0;">Lorem of Vestibulum</b>
                        <div style="width: 100%; margin-top: 29px; text-align: center;">lorem ipsum dolor sit amet</div>
                    </div>
                    <hr/>
                    <p style="margin-top: 20px; line-height: 30px;">
                        <b class="badge badge--gold">finibus</b>
                        <b class="badge badge--gold">tortor purus</b>
                        <b class="badge badge--gold">dolor</b>
                        <b class="badge badge--gold">consequat</b>
                        <b class="badge badge--gold">suscipit</b>
                        <br/>
                        <span style="display: block; height: 12px;"></span>
                        <b class="badge badge--blue">dignissim</b>
                        <b class="badge badge--blue">pellentesque</b>
                        <b class="badge badge--blue">hendrerit</b>
                        <b class="badge badge--blue">iaculis</b>
                        <b class="badge badge--blue">massa</b>
                        <br/>
                        <span style="display: block; height: 12px;"></span>
                        <b class="badge badge--tomato">adipiscing</b>
                        <b class="badge badge--tomato">tortor</b>
                        <b class="badge badge--tomato">aliquam</b>
                        <b class="badge badge--tomato">ornare</b>
                        <b class="badge badge--tomato">eleifend</b>
                        <b class="badge badge--tomato">risus</b>
                        <br/>
                        <span style="display: block; height: 12px;"></span>
                        <b class="badge badge--purple">justo</b>
                        <b class="badge badge--purple">porttitor</b>
                        <b class="badge badge--purple">libero</b>
                        <b class="badge badge--purple">nibh</b>
                    </p>
                `
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

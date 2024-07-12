import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {SelfIntroductionHero} from "../main";
import {SelfIntroductionHeroProps} from "../models";
import * as Variant from "../variants";
import * as StaticAsset from "./static-assets";

export default {component: SelfIntroductionHero, title: "Components/Self-Introduction Hero"} satisfies Meta<typeof SelfIntroductionHero>;
type Story = StoryObj<typeof SelfIntroductionHero>;

const SelfIntroductionHeroWithValidation = withValidation(SelfIntroductionHero, SelfIntroductionHeroProps);
export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        coverPhoto: Sb.locked,
        avatar: Sb.locked,
        name: Sb.text(),
        alternativeName: Sb.text(),
        description: Sb.text(),
        locationLabel: Sb.text(),
        locationValue: Sb.text(),
        emailLabel: Sb.text(),
        emailValue: Sb.text(),
        downloadButton: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        coverPhoto: StaticAsset.CoverPhoto,
        avatar: StaticAsset.Avatar,
        name: "Lorem Ipsum",
        alternativeName: "(Mauris)",
        description: "Nam ante arcu, pharetra id orci vitae, finibus fermentum diam. Nulla vehicula urna et mattis. Etiam augue massa, " +
                     "hendrerit aliquet, blandit a magna.",
        locationLabel: "Vestibulum",
        locationValue: "Lobortis, Felis eget",
        emailLabel: "Nulla",
        emailValue: "lorem@ipsum.magna",
        downloadButton: {
            href: StaticAsset.Avatar,
            label: "Lorem Ipsum",
            icon: DefaultIconSet.Download,
            fileName: "dummy-file"
        }
    },
    render: args => <SelfIntroductionHeroWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

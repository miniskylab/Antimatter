import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Timeline} from "../main";
import {TimelineProps} from "../models";
import {TestData} from "../test-data";
import * as Variant from "../variants";
import * as StaticAsset from "./static-assets";

const TimelineWithValidation = withValidation(Timeline, TimelineProps);
export default {
    component: Timeline,
    title: "Components/Timeline"
} satisfies Meta<typeof Timeline>;
type Story = StoryObj<typeof Timeline>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        events: Sb.locked,
        bootstrapEvent: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        events: [
            {
                icon: DefaultIconSet.Briefcase,
                name: "Lorem Ipsum",
                image: StaticAsset.PlaceholderImage,
                startDate: new Date(2019, 9),
                isOnGoing: true,
                location: "Curabitur accumsan auctor",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis, leo eu efficitur condimentum, " +
                             "tortor augue eleifend purus, ac cursus mauris leo at eros. Nam in commodo erat, in interdum metus. Duis " +
                             "lacinia nisi in dignissim pellentesque. Duis ac leo velit. Duis lacinia tempus turpis, et lobortis mauris " +
                             "gravida cursus. Aenean bibendum enim nec turpis semper pellentesque. Maecenas rhoncus augue ut enim " +
                             "lacinia, eget sollicitudin purus eleifend. Integer turpis nisi, pulvinar eget tellus sit amet, tincidunt " +
                             "faucibus ex. Vestibulum vestibulum ullamcorper enim, sit amet eleifend quam finibus et. Integer finibus " +
                             "pellentesque erat, vel tempor ipsum consectetur quis. Suspendisse id dignissim mi. Pellentesque eu dolor " +
                             "ornare, auctor nunc volutpat, lacinia neque. Donec ligula turpis, porttitor non egestas et, rhoncus et " +
                             "dolor. Sed interdum mauris vel lectus lobortis, vel volutpat orci varius. In ornare elementum ligula, sit " +
                             "amet tincidunt magna bibendum sit amet. Nunc suscipit feugiat lacinia."
            },
            {
                icon: DefaultIconSet.Flag,
                name: "Vestibulum",
                image: StaticAsset.PlaceholderImage,
                startDate: new Date(2018, 10),
                endDate: new Date(2019, 9),
                location: "Phasellus vel commodo urna",
                description: "Vestibulum non felis eu metus eleifend condimentum. Curabitur accumsan auctor eleifend. Phasellus vel " +
                             "commodo urna. Donec vulputate varius maximus. Vestibulum lacus risus, congue nec porta at, scelerisque " +
                             "quis quam. Proin vitae nisi quam. Vestibulum dapibus gravida leo, et fringilla tellus ultricies eu. " +
                             "Nullam semper, elit ut dignissim lacinia, tellus risus malesuada quam, at placerat mauris leo et ex."
            },
            {
                icon: DefaultIconSet.Medal,
                name: "Nulla Facilisi",
                image: StaticAsset.PlaceholderImage,
                startDate: new Date(2016, 5),
                endDate: new Date(2018, 10),
                location: "Proin vitae nisi quam",
                description: "Mauris purus purus, porta at metus eu, dignissim tristique felis. Vestibulum ultricies leo tellus, quis " +
                             "pretium nisl maximus ut. Vestibulum hendrerit finibus libero, nec aliquet augue aliquam ut. Suspendisse " +
                             "vel nisl accumsan, bibendum lorem nec, mollis mi. Vivamus tincidunt magna sem, non rhoncus libero semper " +
                             "a. Integer vestibulum nisl id sem vulputate sodales. Duis maximus lacus vitae ligula venenatis gravida. " +
                             "Donec in elit dignissim, molestie nunc ac, blandit leo."
            },
            {
                icon: DefaultIconSet.Graduation,
                name: "Duis Lacinia",
                image: StaticAsset.PlaceholderImage,
                startDate: new Date(2015, 9),
                location: "Cras ac sodales elit",
                description: "Nulla facilisi. Suspendisse tristique velit sed dapibus sagittis. Suspendisse quis maximus magna. Morbi " +
                             "sed odio ut magna consectetur placerat. Nam ante arcu, pharetra id orci vitae, finibus fermentum diam. " +
                             "Nulla sodales vehicula urna et mattis. Class aptent taciti sociosqu ad litora torquent per conubia " +
                             "nostra, per inceptos himenaeos. Morbi lobortis, felis eget varius fringilla, mi magna ultrices diam, " +
                             "vestibulum accumsan lectus mauris et lorem. Etiam augue massa, hendrerit eu aliquet in, blandit a magna. " +
                             "Etiam non velit ultrices sem facilisis porta. Suspendisse fermentum ligula semper risus pulvinar, in " +
                             "blandit nisi placerat. Vivamus a enim a mi cursus consequat. Praesent pharetra, orci ut malesuada " +
                             "tristique, ante nisi convallis nunc, non tincidunt lorem massa et magna. Quisque tincidunt justo ac " +
                             "turpis convallis pretium et id nunc. In gravida maximus purus vitae facilisis."
            }
        ],
        bootstrapEvent: {
            icon: DefaultIconSet.Code,
            name: "Aliquam turpis leo, pulvinar ultrices est et",
            description: `
                Etiam velit tellus, feugiat vel sollicitudin eget
                <div style="${TestData.htmlStyles.bootstrapEventContainer}">
                    <a href="${StaticAsset.PlaceholderImage}">
                        <img style="${TestData.htmlStyles.bootstrapEventImage}" src="${StaticAsset.PlaceholderImage}"/>
                    </a>
                    <a href="${StaticAsset.PlaceholderImage}">
                        <img style="${TestData.htmlStyles.bootstrapEventImage}" src="${StaticAsset.PlaceholderImage}"/>
                    </a>
                    <a href="${StaticAsset.PlaceholderImage}">
                        <img style="${TestData.htmlStyles.bootstrapEventImage}" src="${StaticAsset.PlaceholderImage}"/>
                    </a>
                    <a href="${StaticAsset.PlaceholderImage}">
                        <img style="${TestData.htmlStyles.bootstrapEventImage}" src="${StaticAsset.PlaceholderImage}"/>
                    </a>
                    <a href="${StaticAsset.PlaceholderImage}">
                        <img style="${TestData.htmlStyles.bootstrapEventImage}" src="${StaticAsset.PlaceholderImage}"/>
                    </a>
                    <a href="${StaticAsset.PlaceholderImage}">
                        <img style="${TestData.htmlStyles.bootstrapEventImage}" src="${StaticAsset.PlaceholderImage}"/>
                    </a>
                    <a href="${StaticAsset.PlaceholderImage}">
                        <img style="${TestData.htmlStyles.bootstrapEventImage}" src="${StaticAsset.PlaceholderImage}"/>
                    </a>
                </div>
            `
        }
    },
    render: args => <TimelineWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

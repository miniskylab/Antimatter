import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {DownloadButton} from "../main";
import {DownloadButtonProps} from "../models";
import * as Variant from "../variants";
import * as StaticAsset from "./static-assets";

export default {component: DownloadButton, title: "Components/Download Button"} satisfies Meta<typeof DownloadButton>;
type Story = StoryObj<typeof DownloadButton>;

const DownloadButtonWithValidation = withValidation(DownloadButton, DownloadButtonProps);
export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        label: Sb.text(),
        icon: Sb.enumDropdown(DefaultIconSet),
        fileName: Sb.text(),
        disabled: Sb.boolean(),
        href: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        href: StaticAsset.DummyFile,
        label: "Download",
        icon: DefaultIconSet.Download,
        fileName: "dummy-file",
        disabled: false
    },
    render: args => <DownloadButtonWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {FilePicker} from "../main";
import {FilePickerProps} from "../models";
import * as Variant from "../variants";

export default {
    component: FilePicker,
    title: "Components/File Picker"
} satisfies Meta<typeof FilePicker>;
type Story = StoryObj<typeof FilePicker>;

const FilePickerWithValidation = withValidation(FilePicker, FilePickerProps);
export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        description: Sb.text(),
        files: Sb.locked,
        maxFileCount: Sb.number(),
        footnote: Sb.text(),
        onSelectFile: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        description: "Lorem ipsum dolor sit amet:",
        files: [],
        maxFileCount: undefined,
        footnote: "Aenean varius mi accumsan imperdiet tincidunt turpis.",
        onSelectFile: () => { alert("Lorem ipsum dolor sit amet"); }
    },
    render: args => <FilePickerWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

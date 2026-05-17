import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {FilePicker} from "../main";
import {FilePickerProps} from "../models";
import * as Variant from "../variants";

export default {
    component: FilePicker,
    title: "Components/File Picker",
    render: (args: Required<FilePickerProps>) =>
    {
        return (
            <FilePickerWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                fileSelectionButton={{
                    ...args.fileSelectionButton,
                    icon: DefaultIconSet.Document,
                    label: "Select File"
                }}
            />
        );
    }
} satisfies Meta<typeof FilePicker>;
type Story = StoryObj<typeof FilePicker>;

const FilePickerWithValidation = withValidation(FilePicker, FilePickerProps);
export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        description: Sb.text(),
        fileSelectionButton: Sb.locked,
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
    }
};

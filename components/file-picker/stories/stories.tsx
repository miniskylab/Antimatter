import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {useArgs} from "storybook/preview-api";
import {FilePicker} from "../main";
import {FilePickerProps} from "../models";
import * as Variant from "../variants";

export default {
    component: FilePicker,
    title: "Components/File Picker",
    render: (args: Required<FilePickerProps>) =>
    {
        const [, setArgs] = useArgs<FilePickerProps>();
        return (
            <FilePickerWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                fileSelectionButton={{
                    ...args.fileSelectionButton,
                    icon: DefaultIconSet.PlusCircle,
                    label: "Select File"
                }}
                onSelectFile={selectedFileData => { setArgs({files: [...args.files, selectedFileData]}); }}
                onDeleteFile={deletedFileUri => { setArgs({files: args.files.filter(x => x.uri !== deletedFileUri)}); }}
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
        maxFileCount: Sb.rangeSlider(1, 10, 1),
        byteMaxFileSize: Sb.rangeSlider(1000 * 1000, 10 * 1000 * 1000, 1000 * 1000),
        footnote: Sb.text(),
        onSelectFile: Sb.locked,
        onDeleteFile: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        description: "Lorem ipsum dolor sit amet:",
        files: [],
        maxFileCount: undefined,
        byteMaxFileSize: undefined,
        footnote: "Aenean varius mi accumsan imperdiet tincidunt turpis."
    }
};

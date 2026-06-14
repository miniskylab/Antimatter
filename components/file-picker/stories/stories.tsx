import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {useArgs} from "storybook/preview-api";
import {FileRow} from "../components";
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
                onProcessFile={async processedFileUri =>
                {
                    const processedFileIndex = args.files.findIndex(x => x.uri === processedFileUri);
                    if (processedFileIndex > -1)
                    {
                        args.files[processedFileIndex] = {
                            ...args.files[processedFileIndex],
                            status: FileRow.Status.Processing
                        };

                        setArgs({files: [...args.files]});

                        await new Promise(resolve => { setTimeout(resolve, 2000); });
                        return Promise.resolve();
                    }

                    return Promise.reject();
                }}
                onFulfillFile={fulfilledFileUri =>
                {
                    const fulfilledFileIndex = args.files.findIndex(x => x.uri === fulfilledFileUri);
                    if (fulfilledFileIndex > -1)
                    {
                        args.files[fulfilledFileIndex] = {
                            ...args.files[fulfilledFileIndex],
                            subtitle: "File processed successfully.",
                            status: FileRow.Status.RanToCompletion
                        };

                        setArgs({files: [...args.files]});
                    }
                }}
                onRejectFile={rejectedFileUri =>
                {
                    const rejectedFileIndex = args.files.findIndex(x => x.uri === rejectedFileUri);
                    if (rejectedFileIndex > -1)
                    {
                        args.files[rejectedFileIndex] = {
                            ...args.files[rejectedFileIndex],
                            subtitle: "Failed to process file.",
                            status: FileRow.Status.Faulted
                        };

                        setArgs({files: [...args.files]});
                    }
                }}
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
        maxFileCount: Sb.rangeSlider(1, 15, 1),
        byteMaxFileSize: Sb.rangeSlider(1000 * 1000, 10 * 1000 * 1000, 1000 * 1000),
        footnote: Sb.text(),
        onSelectFile: Sb.locked,
        onDeleteFile: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        description: "Lorem ipsum dolor sit amet:",
        files: [],
        maxFileCount: 10,
        byteMaxFileSize: 4 * 1000 * 1000,
        footnote: "Aenean varius mi accumsan imperdiet tincidunt turpis."
    }
};

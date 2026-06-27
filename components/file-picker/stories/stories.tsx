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
import {TestData} from "./test-data";

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
                onSelectFile={selectedFileData =>
                {
                    TestData.Files.unshift(selectedFileData);
                    setArgs({files: [...TestData.Files]});
                }}
                onProcessFile={async processedFileId =>
                {
                    const processedFileIndex = TestData.Files.findIndex(x => x.id === processedFileId);
                    if (processedFileIndex > -1)
                    {
                        TestData.Files[processedFileIndex] = {
                            ...TestData.Files[processedFileIndex],
                            subtitle: "Processing file ...",
                            status: FileRow.Status.Processing
                        };

                        setArgs({files: [...TestData.Files]});

                        await new Promise(resolve => { setTimeout(resolve, 5000); });
                        return Promise.resolve();
                    }

                    return Promise.reject();
                }}
                onFulfillFile={fulfilledFileId =>
                {
                    const fulfilledFileIndex = TestData.Files.findIndex(x => x.id === fulfilledFileId);
                    if (fulfilledFileIndex > -1)
                    {
                        TestData.Files[fulfilledFileIndex] = {
                            ...TestData.Files[fulfilledFileIndex],
                            subtitle: "File processed successfully.",
                            status: FileRow.Status.RanToCompletion
                        };

                        setArgs({files: [...TestData.Files]});
                    }
                }}
                onRejectFile={rejectedFileId =>
                {
                    const rejectedFileIndex = TestData.Files.findIndex(x => x.id === rejectedFileId);
                    if (rejectedFileIndex > -1)
                    {
                        TestData.Files[rejectedFileIndex] = {
                            ...TestData.Files[rejectedFileIndex],
                            subtitle: "Failed to process file.",
                            status: FileRow.Status.Faulted
                        };

                        setArgs({files: [...TestData.Files]});
                    }
                }}
                onDeleteFile={deletedFileId =>
                {
                    TestData.Files = TestData.Files.filter(x => x.id !== deletedFileId);
                    setArgs({files: [...TestData.Files]});
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
        maxFileCount: Sb.rangeSlider(1, 15, 1),
        byteMaxFileSize: Sb.rangeSlider(1000 * 1000, 10 * 1000 * 1000, 1000 * 1000),
        footnote: Sb.text(),
        onSelectFile: Sb.locked,
        onDeleteFile: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        description: "Lorem ipsum dolor sit amet:",
        files: [...TestData.Files],
        maxFileCount: 10,
        byteMaxFileSize: 4 * 1000 * 1000,
        footnote: "Aenean varius mi accumsan imperdiet tincidunt turpis."
    }
};

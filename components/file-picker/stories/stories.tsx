import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React, {useRef} from "react";
import {useArgs} from "storybook/preview-api";
import {FileRow} from "../components";
import {FilePicker} from "../main";
import {FilePickerProps, type FilePickerRef} from "../models";
import * as Variant from "../variants";
import {TestData} from "./test-data";

export default {
    component: FilePicker,
    title: "Components/File Picker",
    render: (args: Required<FilePickerProps>) =>
    {
        const [, setArgs] = useArgs<FilePickerProps>();
        const filePickerRef = useRef<FilePickerRef>(null);

        return (
            <FilePickerWithValidation
                {...args}
                ref={filePickerRef}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                fileSelectionButton={{
                    ...args.fileSelectionButton,
                    icon: DefaultIconSet.PlusCircle,
                    label: "Select File"
                }}
                onSelectFile={selectedFileData =>
                {
                    TestData.Files[`${selectedFileData.createdDate.getTime()}`] = selectedFileData;
                    setArgs({files: {...TestData.Files}});
                }}
                onProcessFile={async processedFileId =>
                {
                    TestData.Files[processedFileId] = {
                        ...TestData.Files[processedFileId],
                        subtitle: "Processing file ...",
                        status: FileRow.Status.Processing
                    };

                    setArgs({files: {...TestData.Files}});

                    await new Promise(resolve => { setTimeout(resolve, 5000); });
                    return Promise.resolve();
                }}
                onFulfillFile={fulfilledFileId =>
                {
                    filePickerRef.current?.flashHighlightFiles([fulfilledFileId]);
                    TestData.Files[fulfilledFileId] = {
                        ...TestData.Files[fulfilledFileId],
                        subtitle: "File processed successfully.",
                        status: FileRow.Status.RanToCompletion
                    };

                    setArgs({files: {...TestData.Files}});
                }}
                onRejectFile={rejectedFileId =>
                {
                    TestData.Files[rejectedFileId] = {
                        ...TestData.Files[rejectedFileId],
                        subtitle: "Failed to process file.",
                        status: FileRow.Status.Faulted
                    };

                    setArgs({files: {...TestData.Files}});
                }}
                onDeleteFile={deletedFileId =>
                {
                    delete TestData.Files[deletedFileId];
                    setArgs({files: {...TestData.Files}});
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
        files: {...TestData.Files},
        maxFileCount: 10,
        byteMaxFileSize: 4 * 1000 * 1000,
        footnote: "Aenean varius mi accumsan imperdiet tincidunt turpis."
    }
};

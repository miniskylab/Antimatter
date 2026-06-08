import {Button} from "@miniskylab/antimatter-button";
import {
    type AllPropertiesMustPresent,
    EMPTY_STRING,
    isNotNullAndUndefined,
    Ts,
    useComponentContext,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import {getDocumentAsync} from "expo-document-picker";
import React, {JSX} from "react";
import {FileRow} from "./components";
import {FilePickerContext, FilePickerProps} from "./models";
import * as Variant from "./variants";

/**
 * A component that allows users to select files from their local storage for processing.
 */
export function FilePicker({
    style = Variant.Default,
    description = EMPTY_STRING,
    fileSelectionButton,
    files = [],
    maxFileCount,
    byteMaxFileSize,
    footnote = EMPTY_STRING,
    onSelectFile,
    onDeleteFile
}: FilePickerProps): JSX.Element
{
    const props: AllPropertiesMustPresent<FilePickerProps> = {
        style, description, fileSelectionButton, files, maxFileCount, byteMaxFileSize, footnote, onSelectFile, onDeleteFile
    };

    const context = useComponentContext<FilePickerContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <FilePickerContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {description && <Text style={computedStyle.Description}>{description}</Text>}
                <View style={computedStyle.ControlPanel}>
                    <Button
                        style={computedStyle.FileSelectionButton}
                        icon={fileSelectionButton.icon}
                        label={fileSelectionButton.label}
                        disabled={fileSelectionButton.disabled}
                        onPress={onFileSelectionButtonPress}
                    />
                </View>
                <ScrollView
                    style={computedStyle.FileList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentInsetAdjustmentBehavior={"scrollableAxes"}
                >
                    {files.map(x => (
                        <FileRow.Component
                            key={x.uri}
                            style={computedStyle.FileRow}
                            icon={x.icon}
                            title={x.title}
                            subtitle={x.subtitle}
                            uri={x.uri}
                            processingStatus={x.processingStatus}
                            onDelete={() => { onDeleteFile?.(x.uri); }}
                        />
                    ))}
                </ScrollView>
                {footnote && <Text style={computedStyle.Footnote}>{footnote}</Text>}
            </View>
        </FilePickerContext.Provider>
    );

    async function onFileSelectionButtonPress(): Promise<void>
    {
        const documentPickerResult = await getDocumentAsync({base64: false, copyToCacheDirectory: false, multiple: false, type: "*/*"});
        if (documentPickerResult.canceled)
        {
            return;
        }

        documentPickerResult.assets?.forEach(x =>
        {
            onSelectFile?.({
                icon: DefaultIconSet.Document,
                title: x.name,
                subtitle: isNotNullAndUndefined(x.size) ? `${(x.size / 1024).toFixed(2)} KB` : "-- KB",
                uri: x.uri,
                processingStatus: FileRow.ProcessingStatus.NotStarted
            });
        });
    }
}

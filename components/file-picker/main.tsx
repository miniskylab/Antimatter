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
    onProcessFile,
    onFulfillFile,
    onRejectFile,
    onDeleteFile
}: FilePickerProps): JSX.Element
{
    const props: AllPropertiesMustPresent<FilePickerProps> = {
        style, description, fileSelectionButton, files, maxFileCount, byteMaxFileSize, footnote, onSelectFile, onProcessFile, onFulfillFile,
        onRejectFile, onDeleteFile
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
                            status={x.status}
                            onProcess={() => onProcessFile?.(x.uri)}
                            onFulfill={() => onFulfillFile?.(x.uri)}
                            onReject={() => onRejectFile?.(x.uri)}
                            onDelete={() => onDeleteFile?.(x.uri)}
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
            let status = FileRow.Status.Processing;
            let subtitle = isNotNullAndUndefined(x.size) ? `${(x.size / 1024).toFixed(2)} KB` : "-- KB";
            if (isNotNullAndUndefined(x.size) && isNotNullAndUndefined(byteMaxFileSize) && x.size > byteMaxFileSize)
            {
                status = FileRow.Status.Faulted;
                subtitle = "File size exceeds limit.";
            }

            onSelectFile?.({
                icon: DefaultIconSet.Document,
                title: x.name,
                subtitle,
                uri: x.uri,
                status
            });
        });
    }
}

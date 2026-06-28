import {Button} from "@miniskylab/antimatter-button";
import {
    type AllPropertiesMustPresent,
    EMPTY_STRING,
    isNotNullAndUndefined,
    type Nullable,
    Ts,
    useComponentContext,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import {getDocumentAsync} from "expo-document-picker";
import React, {forwardRef, JSX, RefObject, useEffect, useImperativeHandle, useRef} from "react";
import {FileRow} from "./components";
import {FilePickerContext, FilePickerProps, type FilePickerRef} from "./models";
import * as Variant from "./variants";

/**
 * A component that allows users to select files from their local storage for processing.
 */
export const FilePicker = forwardRef(function FilePicker(
    {
        style = Variant.Default,
        description = EMPTY_STRING,
        fileSelectionButton,
        files = {},
        maxFileCount,
        byteMaxFileSize,
        footnote = EMPTY_STRING,
        onSelectFile,
        onProcessFile,
        onFulfillFile,
        onRejectFile,
        onDeleteFile
    }: FilePickerProps,
    ref: RefObject<FilePickerRef>
): JSX.Element
{
    const props: AllPropertiesMustPresent<FilePickerProps> = {
        style, description, fileSelectionButton, files, maxFileCount, byteMaxFileSize, footnote, onSelectFile, onProcessFile, onFulfillFile,
        onRejectFile, onDeleteFile
    };

    const toBeFlashHighlightedFileIdsRef = useRef<string[]>([]);
    const filesRef = useRef<Record<string, Nullable<FileRow.Ref>>>({});

    const context = useComponentContext<FilePickerContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    useImperativeHandle(ref, () => ({
        flashHighlightFiles(fileIds) { toBeFlashHighlightedFileIdsRef.current = [...fileIds]; }
    }), []);

    useEffect(() =>
    {
        let fileId = toBeFlashHighlightedFileIdsRef.current.pop();
        while (fileId)
        {
            filesRef.current[fileId]?.flashHighlight?.();
            fileId = toBeFlashHighlightedFileIdsRef.current.pop();
        }
    }, [toBeFlashHighlightedFileIdsRef.current]);

    return (
        <FilePickerContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {description && <Text style={computedStyle.Description}>{description}</Text>}
                <View style={computedStyle.ControlPanel}>
                    <Button
                        style={computedStyle.FileSelectionButton}
                        icon={fileSelectionButton.icon}
                        label={fileSelectionButton.label}
                        disabled={isNotNullAndUndefined(maxFileCount) && Object.keys(files).length >= maxFileCount}
                        onPress={onFileSelectionButtonPress}
                    />
                </View>
                <ScrollView
                    style={computedStyle.FileList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentInsetAdjustmentBehavior={"scrollableAxes"}
                >
                    {Object.keys(files).sort(byCreatedDate).map(fileId => (
                        <FileRow.Component
                            key={fileId}
                            ref={ref => { filesRef.current[fileId] = ref; }}
                            style={computedStyle.FileRow}
                            icon={files[fileId].icon}
                            title={files[fileId].title}
                            subtitle={files[fileId].subtitle}
                            status={files[fileId].status}
                            onProcess={() => onProcessFile?.(fileId)}
                            onFulfill={() => onFulfillFile?.(fileId)}
                            onReject={() => onRejectFile?.(fileId)}
                            onDelete={() => onDeleteFile?.(fileId)}
                        />
                    ))}
                </ScrollView>
                {footnote && <Text style={computedStyle.Footnote}>{footnote}</Text>}
            </View>
        </FilePickerContext.Provider>
    );

    function byCreatedDate(fileIdA: string, fileIdB: string): number
    {
        const fileA = files[fileIdA];
        const fileB = files[fileIdB];
        return fileB.createdDate.getTime() - fileA.createdDate.getTime();
    }

    async function onFileSelectionButtonPress(): Promise<void>
    {
        const documentPickerResult = await getDocumentAsync({base64: false, copyToCacheDirectory: false, multiple: false, type: "*/*"});
        if (documentPickerResult.canceled)
        {
            return;
        }

        documentPickerResult.assets?.forEach(x =>
        {
            let status = FileRow.Status.Pending;
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
                status,
                createdDate: new Date()
            });
        });
    }
});

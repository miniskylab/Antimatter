import {type AllPropertiesMustPresent, EMPTY_STRING, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {Text} from "@miniskylab/antimatter-text";
import {View} from "@miniskylab/antimatter-view";
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
    selectedFiles = [],
    maxSelectedFileCount,
    footnote = EMPTY_STRING,
    onSelectFile
}: FilePickerProps): JSX.Element
{
    const props: AllPropertiesMustPresent<FilePickerProps> = {
        style, description, selectedFiles, maxSelectedFileCount, footnote, onSelectFile
    };

    const context = useComponentContext<FilePickerContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <FilePickerContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Text style={computedStyle.Description}>{description}</Text>
                <View style={computedStyle.ControlPanel}>
                    {/*<Button style={computedStyle.SelectFileButton} icon={DefaultIconSet.PlusCircle} onPress={() => {  }}/>*/}
                </View>
                <ScrollView
                    style={computedStyle.FileList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentInsetAdjustmentBehavior={"scrollableAxes"}
                >
                    <FileRow.Component
                        style={computedStyle.FileRow}
                        title={"Lorem ipsum dolor sit amet"}
                        subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
                    />
                    <FileRow.Component
                        style={computedStyle.FileRow}
                        title={"Lorem ipsum dolor sit amet"}
                        subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
                    />
                    <FileRow.Component
                        style={computedStyle.FileRow}
                        title={"Lorem ipsum dolor sit amet"}
                        subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
                    />
                    <FileRow.Component
                        style={computedStyle.FileRow}
                        title={"Lorem ipsum dolor sit amet"}
                        subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
                    />
                    <FileRow.Component
                        style={computedStyle.FileRow}
                        title={"Lorem ipsum dolor sit amet"}
                        subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
                    />
                    <FileRow.Component
                        style={computedStyle.FileRow}
                        title={"Lorem ipsum dolor sit amet"}
                        subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
                    />
                </ScrollView>
                <Text style={computedStyle.Footnote}>{footnote}</Text>
            </View>
        </FilePickerContext.Provider>
    );
}

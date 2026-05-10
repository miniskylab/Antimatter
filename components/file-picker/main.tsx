import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, EMPTY_STRING, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
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
                <Button style={computedStyle.SelectFileButton} icon={DefaultIconSet.PlusCircle} onPress={() => { alert("LEL"); }}/>
                <Text style={computedStyle.Footnote}>{footnote}</Text>
            </View>
        </FilePickerContext.Provider>
    );
}

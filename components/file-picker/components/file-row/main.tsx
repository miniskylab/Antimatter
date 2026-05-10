import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {ProcessingStatus} from "./enums";
import {FileRowContext, Props} from "./models";

export function Component({
    style,
    icon = DefaultIconSet.Document,
    title,
    subtitle,
    processingStatus = ProcessingStatus.NotStarted,
    onRemove
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, icon, title, subtitle, processingStatus, onRemove
    };

    const context = useComponentContext<FileRowContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <FileRowContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Text style={computedStyle.Title} numberOfLines={1}>{title}</Text>
                <Text style={computedStyle.Subtitle} numberOfLines={1}>{subtitle}</Text>
            </View>
        </FileRowContext.Provider>
    );
}

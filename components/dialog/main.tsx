import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, EMPTY_STRING, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {DialogContext, DialogProps} from "./models";
import * as Variant from "./variants";

/**
 * A component that allows users to interact with computers.
 */
export function Dialog({
    style = Variant.Default,
    title = EMPTY_STRING,
    subtitle = EMPTY_STRING,
    icon = DefaultIconSet.None,
    onConfirm
}: DialogProps): JSX.Element
{
    const props: AllPropertiesMustPresent<DialogProps> = {
        style, title, subtitle, icon, onConfirm
    };

    const context = useComponentContext<DialogContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <DialogContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Text style={computedStyle.Title}>{title}</Text>
                <Text style={computedStyle.Subtitle}>{subtitle}</Text>
                <Button style={computedStyle.ConfirmButton} icon={icon} onPress={onConfirm} disabled={!onConfirm}/>
            </View>
        </DialogContext.Provider>
    );
}

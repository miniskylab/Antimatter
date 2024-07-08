import {Button} from "@miniskylab/antimatter-button";
import {AllPropertiesMustPresent, EMPTY_STRING, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {LocalAuthenticationStatus} from "./enums";
import {LocalAuthenticationFormContext, LocalAuthenticationFormProps} from "./models";
import * as Variant from "./variants";

/**
 * A component that authenticates users against credentials stored locally on the device - for example, fingerprint, face, passphrase, or
 * PIN.
 */
export function LocalAuthenticationForm({
    style = Variant.Default,
    title = EMPTY_STRING,
    subtitle = EMPTY_STRING,
    icon = DefaultIconSet.None,
    localAuthenticationStatus = LocalAuthenticationStatus.Unknown,
    onPrompt
}: LocalAuthenticationFormProps): JSX.Element
{
    const props: AllPropertiesMustPresent<LocalAuthenticationFormProps> = {
        style, title, subtitle, icon, onPrompt, localAuthenticationStatus
    };

    const context = useMemo<LocalAuthenticationFormContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <LocalAuthenticationFormContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Text style={computedStyle.Title}>{title}</Text>
                <Text style={computedStyle.Subtitle}>{subtitle}</Text>
                <Button style={computedStyle.PromptButton} icon={icon} onPress={onPrompt} disabled={!onPrompt}/>
            </View>
        </LocalAuthenticationFormContext.Provider>
    );
}

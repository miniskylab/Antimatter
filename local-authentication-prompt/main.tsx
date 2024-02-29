import {Button} from "@miniskylab/antimatter-button";
import {AllPropertiesMustPresent, EMPTY_STRING, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Label} from "@miniskylab/antimatter-label";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {LocalAuthenticationStatus} from "./enums";
import {LocalAuthenticationPromptContext, LocalAuthenticationPromptProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function LocalAuthenticationPrompt({
    style = Variant.Default,
    title = EMPTY_STRING,
    subtitle = EMPTY_STRING,
    icon = DefaultIconSet.None,
    localAuthenticationStatus = LocalAuthenticationStatus.Unknown,
    onPrompt
}: LocalAuthenticationPromptProps): JSX.Element
{
    const props: AllPropertiesMustPresent<LocalAuthenticationPromptProps> = {
        style, title, subtitle, icon, onPrompt, localAuthenticationStatus
    };

    const context = useMemo<LocalAuthenticationPromptContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <LocalAuthenticationPromptContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Label style={computedStyle.Title}>{title}</Label>
                <Label style={computedStyle.Subtitle}>{subtitle}</Label>
                <Button style={computedStyle.PromptButton} icon={icon} onPress={onPrompt} disabled={!onPrompt}/>
            </View>
        </LocalAuthenticationPromptContext.Provider>
    );
}

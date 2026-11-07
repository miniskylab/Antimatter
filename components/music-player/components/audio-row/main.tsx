import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {Text} from "@miniskylab/antimatter-text";
import React, {JSX} from "react";
import {AudioRowContext, Props} from "./models";
import {getFormattedTime} from "./services";

export function Component({
    style,
    audioName,
    secAudioDuration,
    artistName,
    isSelected = false,
    isExcludedFromActivePlaylist = false,
    onPress
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, audioName, secAudioDuration, artistName, isSelected, isExcludedFromActivePlaylist, onPress
    };

    const context = useComponentContext<AudioRowContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <AudioRowContext.Provider value={context}>
            <Pressable style={computedStyle.Root} onPress={onPress}>
                <Text style={computedStyle.AudioName} numberOfLines={1} selectable={false}>{audioName}</Text>
                <Text style={computedStyle.AudioDuration} numberOfLines={1} selectable={false}>{getFormattedTime(secAudioDuration)}</Text>
            </Pressable>
        </AudioRowContext.Provider>
    );
}

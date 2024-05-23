import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {Text} from "@miniskylab/antimatter-text";
import React, {JSX, useMemo} from "react";
import {Props, SongRowContext} from "./models";
import {getFormattedTime} from "./services";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    songName,
    secSongDuration,
    isSelected = false
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, songName, secSongDuration, isSelected
    };

    const context = useMemo<SongRowContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <SongRowContext.Provider value={context}>
            <Pressable style={computedStyle.Root}>
                <Text style={computedStyle.SongName} numberOfLines={1}>{songName}</Text>
                <Text style={computedStyle.SongDuration} numberOfLines={1}>{getFormattedTime(secSongDuration)}</Text>
            </Pressable>
        </SongRowContext.Provider>
    );
}

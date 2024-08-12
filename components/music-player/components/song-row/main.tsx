import {type AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {Text} from "@miniskylab/antimatter-text";
import React, {JSX, useMemo} from "react";
import {type Props, SongRowContext} from "./models";
import {getFormattedTime} from "./services";

export function Component({
    style,
    songName,
    secSongDuration,
    singer,
    isSelected = false,
    isExcludedFromActivePlaylist = false,
    onPress
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, songName, secSongDuration, singer, isSelected, isExcludedFromActivePlaylist, onPress
    };

    const context = useMemo<SongRowContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <SongRowContext.Provider value={context}>
            <Pressable style={computedStyle.Root} onPress={onPress}>
                <Text style={computedStyle.SongName} numberOfLines={1} selectable={false}>{songName}</Text>
                <Text style={computedStyle.SongDuration} numberOfLines={1} selectable={false}>{getFormattedTime(secSongDuration)}</Text>
            </Pressable>
        </SongRowContext.Provider>
    );
}

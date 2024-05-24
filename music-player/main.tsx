import {Button} from "@miniskylab/antimatter-button";
import {AllPropertiesMustPresent, EMPTY_STRING, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {SongRow} from "./components";
import {RepeatMode} from "./enums";
import {ButtonTypeContext, MusicPlayerContext, MusicPlayerProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function MusicPlayer({
    style = Variant.Default,
    title,
    subtitle = EMPTY_STRING,
    secTimer = undefined,
    isPlaying = false,
    isShuffleEnabled = false,
    repeatMode = RepeatMode.None,
    isPlaylistSelectionEnabled = false,
    tracklist = [],
    onPlay,
    onPause,
    onNext,
    onPrevious,
    onShuffleModeToggle,
    onRepeatModeChange,
    onPlaylistSelectionToggle
}: MusicPlayerProps): JSX.Element
{
    const props: AllPropertiesMustPresent<MusicPlayerProps> = {
        style, title, subtitle, secTimer, isPlaying, isShuffleEnabled, repeatMode, isPlaylistSelectionEnabled, tracklist, onPlay, onPause,
        onNext, onPrevious, onShuffleModeToggle, onRepeatModeChange, onPlaylistSelectionToggle
    };

    const context = useMemo<MusicPlayerContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <MusicPlayerContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.NowPlayingContainer}>
                    <Icon style={computedStyle.Icon} name={DefaultIconSet.Music} selectable={false}/>
                    <View style={computedStyle.TitleContainer}>
                        <Text style={computedStyle.MainTitle} numberOfLines={1}>{title}</Text>
                        <Text style={computedStyle.Subtitle} numberOfLines={1}>{subtitle}</Text>
                    </View>
                </View>
                <View style={computedStyle.ControlContainer}>
                    <Text style={computedStyle.Timer} selectable={false}>{SongRow.Service.getFormattedTime(secTimer)}</Text>
                    <ButtonTypeContext.Provider value={"shuffle"}>
                        <Button
                            style={computedStyle.Button}
                            icon={DefaultIconSet.Shuffle}
                            onPress={() => onShuffleModeToggle?.(!isShuffleEnabled)}
                        />
                    </ButtonTypeContext.Provider>
                    <ButtonTypeContext.Provider value={"previous"}>
                        <Button style={computedStyle.Button} icon={DefaultIconSet.Previous} onPress={onPrevious}/>
                    </ButtonTypeContext.Provider>
                    <ButtonTypeContext.Provider value={"play-pause"}>
                        <Button
                            style={computedStyle.Button}
                            icon={isPlaying ? DefaultIconSet.Pause : DefaultIconSet.Play}
                            onPress={isPlaying ? onPause : onPlay}
                        />
                    </ButtonTypeContext.Provider>
                    <ButtonTypeContext.Provider value={"next"}>
                        <Button style={computedStyle.Button} icon={DefaultIconSet.Next} onPress={onNext}/>
                    </ButtonTypeContext.Provider>
                    <ButtonTypeContext.Provider value={"repeat"}>
                        <Button style={computedStyle.Button} icon={DefaultIconSet.RepeatAll} onPress={changeRepeatMode}/>
                    </ButtonTypeContext.Provider>
                    <ButtonTypeContext.Provider value={"playlist"}>
                        <Button
                            style={computedStyle.Button}
                            icon={DefaultIconSet.Document}
                            onPress={() => onPlaylistSelectionToggle?.(!isPlaylistSelectionEnabled)}
                        />
                    </ButtonTypeContext.Provider>
                </View>
                <ScrollView style={computedStyle.SongList} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    {
                        tracklist.filter(song => isPlaylistSelectionEnabled ? true : song.isPlaying || !song.isExcludedFromActivePlaylist)
                            .map(song => (
                                <SongRow.Component
                                    key={song.songName}
                                    style={computedStyle.SongRow}
                                    onPress={song.isPlaying && !isPlaylistSelectionEnabled ? undefined : () => { onSongPress(song); }}
                                    {...song}
                                />
                            ))
                    }
                </ScrollView>
            </View>
        </MusicPlayerContext.Provider>
    );

    function changeRepeatMode(): void
    {
        switch (repeatMode)
        {
            case RepeatMode.None:
                onRepeatModeChange?.(RepeatMode.All);
                return;

            case RepeatMode.All:
                onRepeatModeChange?.(RepeatMode.None);
                return;

            default:
                throw new Error(`No valid mode to switch to from mode "${Ts.Enum.getName(RepeatMode, repeatMode)}"`);
        }
    }

    function onSongPress(song: typeof tracklist[number]): void
    {
        console.log(song.songName);
    }
}

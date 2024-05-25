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
    titlePlaceholder,
    subtitlePlaceholder = EMPTY_STRING,
    secTimer = undefined,
    selectedSongName = undefined,
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
    onPlaylistSelectionToggle,
    onSongExclusionStatusToggle
}: MusicPlayerProps): JSX.Element
{
    const props: AllPropertiesMustPresent<MusicPlayerProps> = {
        style, titlePlaceholder, subtitlePlaceholder, secTimer, selectedSongName, isPlaying, isShuffleEnabled, repeatMode,
        isPlaylistSelectionEnabled, tracklist, onPlay, onPause, onNext, onPrevious, onShuffleModeToggle, onRepeatModeChange,
        onPlaylistSelectionToggle, onSongExclusionStatusToggle
    };

    const context = useMemo<MusicPlayerContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    const selectedSong = tracklist.find(x => x.songName === selectedSongName);
    const subTitle = selectedSong?.singer ?? subtitlePlaceholder;

    return (
        <MusicPlayerContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.NowPlayingContainer}>
                    <Icon style={computedStyle.Icon} name={DefaultIconSet.Music} selectable={false}/>
                    <View style={computedStyle.TitleContainer}>
                        <Text style={computedStyle.MainTitle} numberOfLines={1}>{selectedSongName ?? titlePlaceholder}</Text>
                        {!!subTitle && <Text style={computedStyle.Subtitle} numberOfLines={1}>{subTitle}</Text>}
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
                            onPress={onPlayPauseButtonPress}
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
                    {tracklist
                        .filter(song => isPlaylistSelectionEnabled || !song.isExcludedFromActivePlaylist)
                        .map(song => (
                            <SongRow.Component
                                key={song.songName}
                                style={computedStyle.SongRow}
                                isSelected={isSelectedSong(song)}
                                onPress={isSelectedSong(song) && !isPlaylistSelectionEnabled ? undefined : () => { onSongRowPress(song); }}
                                {...song}
                            />
                        ))}
                </ScrollView>
            </View>
        </MusicPlayerContext.Provider>
    );

    function isSelectedSong(song: SongRow.SongData): boolean
    {
        return selectedSongName === song.songName;
    }

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

    function onPlayPauseButtonPress(): void
    {
        if (isPlaying)
        {
            return onPause?.();
        }

        const toBePlayedSong = selectedSong ?? tracklist[0];
        if (toBePlayedSong)
        {
            return onPlay?.(toBePlayedSong);
        }
    }

    function onSongRowPress(song: SongRow.SongData): void
    {
        if (isPlaylistSelectionEnabled)
        {
            return onSongExclusionStatusToggle?.(song.songName);
        }

        return onPlay?.(song);
    }
}

import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, EMPTY_STRING, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {SongRow} from "./components";
import {RepeatMode} from "./enums";
import {MusicPlayerContext, MusicPlayerProps} from "./models";
import * as Variant from "./variants";

/**
 * A component for playing digital audio files.
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
    onPlayNext,
    onPlayPrevious,
    onShuffleModeToggle,
    onRepeatModeChange,
    onPlaylistSelectionToggle,
    onSongExclusionStatusToggle
}: MusicPlayerProps): JSX.Element
{
    const props: AllPropertiesMustPresent<MusicPlayerProps> = {
        style, titlePlaceholder, subtitlePlaceholder, secTimer, selectedSongName, isPlaying, isShuffleEnabled, repeatMode,
        isPlaylistSelectionEnabled, tracklist, onPlay, onPause, onPlayNext, onPlayPrevious, onShuffleModeToggle, onRepeatModeChange,
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
                    <Button
                        style={computedStyle.ShuffleButton}
                        icon={DefaultIconSet.Shuffle}
                        onPress={() => onShuffleModeToggle?.(!isShuffleEnabled)}
                    />
                    <Button style={computedStyle.PlayPreviousButton} icon={DefaultIconSet.Previous} onPress={onPlayPrevious}/>
                    <Button
                        style={computedStyle.PlayPauseButton}
                        icon={isPlaying ? DefaultIconSet.Pause : DefaultIconSet.Play}
                        onPress={onPlayPauseButtonPress}
                    />
                    <Button style={computedStyle.PlayNextButton} icon={DefaultIconSet.Next} onPress={onPlayNext}/>
                    <Button style={computedStyle.RepeatModeButton} icon={DefaultIconSet.RepeatAll} onPress={changeRepeatMode}/>
                    <Button
                        style={computedStyle.PlaylistButton}
                        icon={DefaultIconSet.Playlist}
                        onPress={() => onPlaylistSelectionToggle?.(!isPlaylistSelectionEnabled)}
                    />
                </View>
                <ScrollView
                    style={computedStyle.SongList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentInsetAdjustmentBehavior={"scrollableAxes"}
                >
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

        return onPlay?.(selectedSong?.songName);
    }

    function onSongRowPress(song: SongRow.SongData): void
    {
        if (isPlaylistSelectionEnabled)
        {
            return onSongExclusionStatusToggle?.(song.songName, !song.isExcludedFromActivePlaylist);
        }

        return onPlay?.(song.songName);
    }
}

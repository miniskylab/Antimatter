import {Button} from "@miniskylab/antimatter-button";
import {
    type AllPropertiesMustPresent,
    EMPTY_STRING,
    isNullOrUndefined,
    Ts,
    useComponentContext,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {AudioRow} from "./components";
import {RepeatMode} from "./enums";
import {MusicPlayerContext, MusicPlayerProps} from "./models";
import * as Variant from "./variants";

/**
 * A component for playing digital audio content.
 */
export function MusicPlayer({
    style = Variant.Default,
    titlePlaceholder,
    subtitlePlaceholder = EMPTY_STRING,
    secTimer = undefined,
    selectedAudioName = undefined,
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
    onAudioExclusionStatusToggle
}: MusicPlayerProps): JSX.Element
{
    const props: AllPropertiesMustPresent<MusicPlayerProps> = {
        style, titlePlaceholder, subtitlePlaceholder, secTimer, selectedAudioName, isPlaying, isShuffleEnabled, repeatMode,
        isPlaylistSelectionEnabled, tracklist, onPlay, onPause, onPlayNext, onPlayPrevious, onShuffleModeToggle, onRepeatModeChange,
        onPlaylistSelectionToggle, onAudioExclusionStatusToggle
    };

    const selectedAudio = tracklist.find(x => x.audioName === selectedAudioName);
    const subTitle = selectedAudio?.artistName ?? subtitlePlaceholder;

    const context = useComponentContext<MusicPlayerContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <MusicPlayerContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.NowPlayingContainer}>
                    <Icon style={computedStyle.Icon} name={DefaultIconSet.Music} selectable={false}/>
                    <View style={computedStyle.TitleContainer}>
                        <Text style={computedStyle.MainTitle} numberOfLines={1}>{selectedAudioName ?? titlePlaceholder}</Text>
                        {!!subTitle && <Text style={computedStyle.Subtitle} numberOfLines={1}>{subTitle}</Text>}
                    </View>
                </View>
                <View style={computedStyle.ControlContainer}>
                    <Text style={computedStyle.Timer} selectable={false}>{AudioRow.Service.getFormattedTime(secTimer)}</Text>
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
                    <Button
                        style={computedStyle.RepeatModeButton}
                        icon={repeatMode === RepeatMode.One ? DefaultIconSet.RepeatOne : DefaultIconSet.RepeatAll}
                        onPress={() => changeRepeatMode(selectedAudio)}
                    />
                    <Button
                        style={computedStyle.PlaylistButton}
                        icon={DefaultIconSet.Playlist}
                        onPress={() => onPlaylistSelectionToggle?.(!isPlaylistSelectionEnabled)}
                    />
                </View>
                <ScrollView
                    style={computedStyle.AudioList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentInsetAdjustmentBehavior={"scrollableAxes"}
                >
                    {tracklist
                        .filter(audio => isPlaylistSelectionEnabled || !audio.isExcludedFromActivePlaylist)
                        .map(audio => (
                            <AudioRow.Component
                                key={audio.audioName}
                                style={computedStyle.AudioRow}
                                isSelected={isSelectedAudio(audio)}
                                onPress={
                                    isSelectedAudio(audio) && !isPlaylistSelectionEnabled
                                        ? undefined
                                        : () => { onAudioRowPress(audio); }
                                }
                                {...audio}
                            />
                        ))}
                </ScrollView>
            </View>
        </MusicPlayerContext.Provider>
    );

    function isSelectedAudio(audio: AudioRow.AudioData): boolean
    {
        return selectedAudioName === audio.audioName;
    }

    function changeRepeatMode(audio: AudioRow.AudioData | undefined): void
    {
        switch (repeatMode)
        {
            case RepeatMode.None:
                onRepeatModeChange?.(RepeatMode.All);
                return;

            case RepeatMode.All:
                onRepeatModeChange?.(isNullOrUndefined(audio) || audio.isExcludedFromActivePlaylist ? RepeatMode.None : RepeatMode.One);
                return;

            case RepeatMode.One:
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

        return onPlay?.(selectedAudio?.audioName);
    }

    function onAudioRowPress(audio: AudioRow.AudioData): void
    {
        if (isPlaylistSelectionEnabled)
        {
            return onAudioExclusionStatusToggle?.(audio.audioName, !audio.isExcludedFromActivePlaylist);
        }

        return onPlay?.(audio.audioName);
    }
}

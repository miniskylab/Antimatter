import {isNotNullAndUndefined, Sb, withValidation} from "@miniskylab/antimatter-framework";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React, {useState} from "react";
import {MusicPlayer} from "../main";
import {MusicPlayerProps} from "../models";
import {StateMachine} from "../services";
import * as Variant from "../variants";
import {TestData} from "./test-data";

const MusicPlayerWithValidation = withValidation(MusicPlayer, MusicPlayerProps);
export default {
    component: MusicPlayer,
    title: "Components/Music Player",
    render: (args: Required<MusicPlayerProps>) =>
    {
        const [, setArgs] = useArgs<MusicPlayerProps>();
        const [musicPlayerState, setMusicPlayerState] = useState(() =>
        {
            StateMachine.resetState({indexedTracklist: {...TestData.IndexedTracklist}});
            return StateMachine.getState();
        });

        const playingSongUri = isNotNullAndUndefined(musicPlayerState.playingSongIndex)
            ? musicPlayerState.playQueue[musicPlayerState.playingSongIndex]
            : undefined;

        const playingSong = isNotNullAndUndefined(playingSongUri)
            ? musicPlayerState.indexedTracklist[playingSongUri]
            : undefined;

        return (
            <MusicPlayerWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                titlePlaceholder={musicPlayerState.playingSongIndex === Infinity ? "All Songs Have Been Played" : "Not Playing"}
                tracklist={Object.values(musicPlayerState.indexedTracklist)}
                selectedSongName={playingSong?.songName}
                isPlaying={musicPlayerState.isPlaying}
                secTimer={musicPlayerState.secPlaybackProgress ?? playingSong?.secSongDuration}
                isShuffleEnabled={musicPlayerState.isShuffleEnabled}
                repeatMode={musicPlayerState.repeatMode}
                onPlay={songName =>
                {
                    if (isNotNullAndUndefined(songName))
                    {
                        StateMachine.playSongNamed(songName);
                    }
                    else
                    {
                        StateMachine.setIsPlaying(true);
                    }

                    setMusicPlayerState(StateMachine.getState());
                }}
                onPause={() =>
                {
                    StateMachine.setIsPlaying(false);
                    setMusicPlayerState(StateMachine.getState());
                }}
                onPlayNext={() =>
                {
                    StateMachine.playNext();
                    setMusicPlayerState(StateMachine.getState());
                }}
                onPlayPrevious={() =>
                {
                    StateMachine.playPrevious();
                    setMusicPlayerState(StateMachine.getState());
                }}
                onShuffleModeToggle={isShuffleEnabled =>
                {
                    StateMachine.setIsShuffleEnabled(isShuffleEnabled);
                    setMusicPlayerState(StateMachine.getState());
                }}
                onRepeatModeChange={newRepeatMode =>
                {
                    StateMachine.setRepeatMode(newRepeatMode);
                    setMusicPlayerState(StateMachine.getState());
                }}
                onSongExclusionStatusToggle={(songName, isExcluded) =>
                {
                    StateMachine.setSongExclusionStatus(songName, isExcluded);
                    setMusicPlayerState(StateMachine.getState());
                }}
                onPlaylistSelectionToggle={isPlaylistSelectionEnabled => setArgs({isPlaylistSelectionEnabled})}
            />
        );
    }
} satisfies Meta<typeof MusicPlayer>;
type Story = StoryObj<typeof MusicPlayer>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        titlePlaceholder: Sb.locked,
        subtitlePlaceholder: Sb.locked,
        secTimer: Sb.locked,
        isPlaying: Sb.locked,
        isShuffleEnabled: Sb.locked,
        isPlaylistSelectionEnabled: Sb.locked,
        repeatMode: Sb.locked,
        selectedSongName: Sb.locked,
        tracklist: Sb.locked,
        onPlay: Sb.locked,
        onPause: Sb.locked,
        onPlayNext: Sb.locked,
        onPlayPrevious: Sb.locked,
        onShuffleModeToggle: Sb.locked,
        onRepeatModeChange: Sb.locked,
        onPlaylistSelectionToggle: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default)
    }
};

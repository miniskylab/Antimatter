import {isNotNullAndUndefined, Sb, withValidation} from "@miniskylab/antimatter-framework";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React, {useState} from "react";
import {MusicPlayer} from "../main";
import {MusicPlayerProps} from "../models";
import {MusicPlayerStateMachine} from "../services";
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
            MusicPlayerStateMachine.resetState({indexedTracklist: {...TestData.IndexedTracklist}});
            return MusicPlayerStateMachine.getState();
        });

        const playingSongUri = isNotNullAndUndefined(musicPlayerState.playingSongIndex)
            ? musicPlayerState.playQueue[musicPlayerState.playingSongIndex]
            : undefined;

        const playingSong = isNotNullAndUndefined(playingSongUri)
            ? musicPlayerState.indexedTracklist[playingSongUri]
            : undefined;

        const titlePlaceholder = musicPlayerState.playingSongIndex === Infinity
            ? "All Songs Have Been Played"
            : "Not Playing";

        return (
            <MusicPlayerWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                titlePlaceholder={titlePlaceholder}
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
                        MusicPlayerStateMachine.playSongNamed(songName);
                    }
                    else
                    {
                        MusicPlayerStateMachine.setIsPlaying(true);
                    }

                    setMusicPlayerState(MusicPlayerStateMachine.getState());
                }}
                onPause={() =>
                {
                    MusicPlayerStateMachine.setIsPlaying(false);
                    setMusicPlayerState(MusicPlayerStateMachine.getState());
                }}
                onPlayNext={() =>
                {
                    MusicPlayerStateMachine.playNext();
                    setMusicPlayerState(MusicPlayerStateMachine.getState());
                }}
                onPlayPrevious={() =>
                {
                    MusicPlayerStateMachine.playPrevious();
                    setMusicPlayerState(MusicPlayerStateMachine.getState());
                }}
                onShuffleModeToggle={isShuffleEnabled =>
                {
                    MusicPlayerStateMachine.setIsShuffleEnabled(isShuffleEnabled);
                    setMusicPlayerState(MusicPlayerStateMachine.getState());
                }}
                onRepeatModeChange={newRepeatMode =>
                {
                    MusicPlayerStateMachine.setRepeatMode(newRepeatMode);
                    setMusicPlayerState(MusicPlayerStateMachine.getState());
                }}
                onSongExclusionStatusToggle={(songName, isExcluded) =>
                {
                    MusicPlayerStateMachine.setSongExclusionStatus(songName, isExcluded);
                    setMusicPlayerState(MusicPlayerStateMachine.getState());
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

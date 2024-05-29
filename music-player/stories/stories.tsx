import {EMPTY_STRING, Sb, withValidation} from "@miniskylab/antimatter-framework";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {RepeatMode} from "../enums";
import {MusicPlayer} from "../main";
import {MusicPlayerProps} from "../models";
import * as Variant from "../variants";
import {TestData} from "./test-data";

const MusicPlayerWithValidation = withValidation(MusicPlayer, MusicPlayerProps);
export default {
    component: MusicPlayer,
    title: "Components/Music Player",
    render: (args: Required<MusicPlayerProps>) =>
    {
        const [, setArgs] = useArgs<MusicPlayerProps>();

        return (
            <MusicPlayerWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                onPause={() => setArgs({isPlaying: false})}
                onShuffleModeToggle={isShuffleEnabled => setArgs({isShuffleEnabled})}
                onRepeatModeChange={newRepeatMode => setArgs({repeatMode: newRepeatMode})}
                onPlaylistSelectionToggle={isPlaylistSelectionEnabled => setArgs({isPlaylistSelectionEnabled})}
                onPlay={song => setArgs({selectedSongName: song.songName, secTimer: song.secSongDuration, isPlaying: true})}
                onSongExclusionStatusToggle={songName =>
                {
                    const songIndex = args.tracklist.findIndex(x => x.songName === songName);
                    if (songIndex > -1)
                    {
                        const copyOfSong = {...args.tracklist[songIndex]};
                        copyOfSong.isExcludedFromActivePlaylist = !copyOfSong.isExcludedFromActivePlaylist;

                        const copyOfTracklist = [...args.tracklist];
                        copyOfTracklist[songIndex] = copyOfSong;
                        setArgs({tracklist: copyOfTracklist});
                    }
                }}
            />
        );
    }
} satisfies Meta<typeof MusicPlayer>;
type Story = StoryObj<typeof MusicPlayer>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        titlePlaceholder: Sb.text(),
        subtitlePlaceholder: Sb.text(),
        secTimer: Sb.number(0, 3601, 1),
        isPlaying: Sb.boolean(),
        isShuffleEnabled: Sb.boolean(),
        isPlaylistSelectionEnabled: Sb.boolean(),
        repeatMode: Sb.enumDropdown(RepeatMode),
        selectedSongName: Sb.locked,
        tracklist: Sb.locked,
        onPlay: Sb.locked,
        onPause: Sb.locked,
        onNext: Sb.locked,
        onPrevious: Sb.locked,
        onShuffleModeToggle: Sb.locked,
        onRepeatModeChange: Sb.locked,
        onPlaylistSelectionToggle: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        titlePlaceholder: "Not Playing",
        subtitlePlaceholder: EMPTY_STRING,
        secTimer: undefined,
        selectedSongName: undefined,
        isPlaying: false,
        isShuffleEnabled: false,
        isPlaylistSelectionEnabled: false,
        repeatMode: RepeatMode.None,
        tracklist: TestData.Tracklist
    }
};

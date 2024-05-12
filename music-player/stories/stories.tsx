import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {RepeatMode} from "../enums";
import {MusicPlayer} from "../main";
import {MusicPlayerProps} from "../models";
import * as Variant from "../variants";

const MusicPlayerWithValidation = withValidation(MusicPlayer, MusicPlayerProps);
export default {
    component: MusicPlayer,
    title: "Components/Music Player"
} satisfies Meta<typeof MusicPlayer>;
type Story = StoryObj<typeof MusicPlayer>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        title: Sb.text(),
        subtitle: Sb.text(),
        secTimer: Sb.number(0),
        isShuffleEnabled: Sb.boolean(),
        isPlaylistSelectionEnabled: Sb.boolean(),
        repeatMode: Sb.enumDropdown(RepeatMode),
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
        title: "Neque porro quisquam est qui dolorem Neque porro quisquam",
        subtitle: "Lorem ipsum dolor sit amet",
        secTimer: 0,
        isShuffleEnabled: false,
        isPlaylistSelectionEnabled: false,
        repeatMode: RepeatMode.None
    },
    render: args => <MusicPlayerWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};

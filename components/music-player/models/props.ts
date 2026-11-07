import {
    ComponentName,
    ComponentProps,
    IsArray,
    IsBoolean,
    IsDefined,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min
} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {AudioRow} from "../components";
import {RepeatMode} from "../enums";
import {type MusicPlayerStyle} from "./style";

@ComponentName("Music Player")
export class MusicPlayerProps extends ComponentProps<MusicPlayerStyle>
{
    /**
     * Specify the text that provides a succinct description of the music player before any audio has been played.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly titlePlaceholder: string;


    /**
     * Specify the text that clarifies or provides context to the title before any audio has been played.
     */
    @IsString()
    @IsOptional()
    readonly subtitlePlaceholder?: string;


    /**
     * Specify the timer value in seconds.
     */
    @Min(0)
    @IsNumber()
    @IsOptional()
    readonly secTimer?: number;


    /**
     * Specify the selected audio by its name.
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly selectedAudioName?: string;


    /**
     * Set this option to ***true*** to specify that the music player is playing audio.
     */
    @IsBoolean()
    @IsOptional()
    readonly isPlaying?: boolean;


    /**
     * Set this option to ***true*** to enable shuffle mode.
     */
    @IsBoolean()
    @IsOptional()
    readonly isShuffleEnabled?: boolean;


    /**
     * Specify what will happen when the music player finishes playing one or all of the audio items.
     *
     * @type RepeatMode
     */
    @IsEnum(RepeatMode)
    @IsOptional()
    readonly repeatMode?: RepeatMode;


    /**
     * Set this option to ***true*** to enter playlist selection mode. In this mode, users can include or exclude audio from the playlist.
     * Excluded audio will not be played. Set this option to ***false*** to exit playlist selection mode.
     */
    @IsBoolean()
    @IsOptional()
    readonly isPlaylistSelectionEnabled?: boolean;


    /**
     * Specify all audio accessible to the music player.
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => AudioRow.Props)
    readonly tracklist?: AudioRow.AudioData[];


    /**
     * Specify the piece of code that will be executed when the music player starts or resumes audio playback.
     */
    readonly onPlay?: (audioName?: string) => void;


    /**
     * Specify the piece of code that will be executed when the music player temporarily stops playback.
     */
    readonly onPause?: () => void;


    /**
     * Specify the piece of code that will be executed when the music player plays the next audio.
     */
    readonly onPlayNext?: () => void;


    /**
     * Specify the piece of code that will be executed when the music player plays the previous audio.
     */
    readonly onPlayPrevious?: () => void;


    /**
     * Specify the piece of code that will be executed when shuffle mode changes.
     */
    readonly onShuffleModeToggle?: (isShuffleEnabled: boolean) => void;


    /**
     * Specify the piece of code that will be executed when repeat mode changes.
     */
    readonly onRepeatModeChange?: (newRepeatMode: RepeatMode) => void;


    /**
     * Specify the piece of code that will be executed when the playlist-selection mode changes.
     */
    readonly onPlaylistSelectionToggle?: (isPlaylistSelectionEnabled: boolean) => void;


    /**
     * Specify the piece of code that will be executed when audio is included in or excluded from the playlist.
     */
    readonly onAudioExclusionStatusToggle?: (audioName: string, isExcluded: boolean) => void;
}

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
import {SongRow} from "../components";
import {RepeatMode} from "../enums";
import {type MusicPlayerStyle} from "./style";

@ComponentName("Music Player")
export class MusicPlayerProps extends ComponentProps<MusicPlayerStyle>
{
    /**
     * Specify the text that provides a succinct description of the music player before any audio files have been played.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly titlePlaceholder: string;


    /**
     * Specify the text that clarifies or provides context to the title before any audio files have been played.
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
     * Specify the selected song by its name.
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly selectedSongName?: string;


    /**
     * Set this option to ***true*** to specify that the music player is playing an audio file.
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
     * Specify what will happen when the music player finishes playing one or all the audio files.
     *
     * @type RepeatMode
     */
    @IsEnum(RepeatMode)
    @IsOptional()
    readonly repeatMode?: RepeatMode;


    /**
     * Set this option to ***true*** to enter playlist selection mode. In this mode, users can include or exclude audio files from the
     * playlist. Excluded audio files will not be played. Set this option to ***false*** to exit playlist selection mode.
     */
    @IsBoolean()
    @IsOptional()
    readonly isPlaylistSelectionEnabled?: boolean;


    /**
     * Specify all audio files to which the music player has access.
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => SongRow.Props)
    readonly tracklist?: SongRow.SongData[];


    /**
     * Specify the piece of code that will be executed when the music player starts playing an audio file or resumes playback.
     */
    readonly onPlay?: (songName?: string) => void;


    /**
     * Specify the piece of code that will be executed when the music player temporarily stops playback.
     */
    readonly onPause?: () => void;


    /**
     * Specify the piece of code that will be executed when the music player plays the next audio file.
     */
    readonly onPlayNext?: () => void;


    /**
     * Specify the piece of code that will be executed when the music player plays the previous audio file.
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
     * Specify the piece of code that will be executed when playlist-selection mode changes.
     */
    readonly onPlaylistSelectionToggle?: (isPlaylistSelectionEnabled: boolean) => void;


    /**
     * Specify the piece of code that will be executed when an audio file is included or excluded from the playlist.
     */
    readonly onSongExclusionStatusToggle?: (songName: string, isExcluded: boolean) => void;
}

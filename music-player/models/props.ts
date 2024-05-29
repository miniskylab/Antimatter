import {
    ComponentName,
    ComponentProps,
    IsBoolean,
    IsDefined,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import type {SongRow} from "../components";
import {RepeatMode} from "../enums";
import {type MusicPlayerStyle} from "./style";

@ComponentName("Music Player")
export class MusicPlayerProps extends ComponentProps<MusicPlayerStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly titlePlaceholder: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly subtitlePlaceholder?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @Min(0)
    @IsNumber()
    @IsOptional()
    readonly secTimer?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly selectedSongName?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isPlaying?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isShuffleEnabled?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type RepeatMode
     */
    @IsEnum(RepeatMode)
    @IsOptional()
    readonly repeatMode?: RepeatMode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isPlaylistSelectionEnabled?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly tracklist?: SongRow.SongData[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPlay?: (song: SongRow.SongData) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPause?: () => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onNext?: () => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPrevious?: () => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onShuffleModeToggle?: (isShuffleEnabled: boolean) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onRepeatModeChange?: (newRepeatMode: RepeatMode) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPlaylistSelectionToggle?: (isPlaylistSelectionEnabled: boolean) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSongExclusionStatusToggle?: (songName: string) => void;
}

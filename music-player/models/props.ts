import {
    ComponentName,
    ComponentProps,
    GestureResponderEventHandler,
    IsBoolean,
    IsDefined,
    IsEnum,
    IsInteger,
    IsNumber,
    IsString,
    Min
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {RepeatMode} from "../enums";
import type {Tracklist} from "../types";
import {type MusicPlayerStyle} from "./style";

@ComponentName("Music Player")
export class MusicPlayerProps extends ComponentProps<MusicPlayerStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsDefined()
    readonly title: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly subtitle?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @Min(0)
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly secTimer?: number;


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
    readonly tracklist?: Tracklist;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPlay?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPause?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onNext?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPrevious?: GestureResponderEventHandler;


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
}

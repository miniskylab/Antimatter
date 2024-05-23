import {
    ArrayNotEmpty,
    ComponentName,
    ComponentProps,
    GestureResponderEventHandler,
    IsArray,
    IsBoolean,
    IsDefined,
    IsEnum,
    IsInteger,
    IsNumber,
    IsString,
    Min,
    WithoutStyle
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
     *
     * @type SongRow.Props[]
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => SongRow.Props)
    readonly songs?: WithoutStyle<SongRow.Props>[];


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

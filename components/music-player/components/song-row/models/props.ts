import {
    ComponentProps,
    GestureResponderEventHandler,
    IsBoolean,
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Style} from "./style";

/**
 * Represents a single digital audio file that can be played in the music player.
 */
export class Props extends ComponentProps<Style>
{
    /**
     * Specify the text that will be displayed in the music player for identification or description of the audio file.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly songName: string;


    /**
     * Specify how much time it takes, in seconds, for the music player to finish playing the audio file without any interruption.
     */
    @Min(0)
    @IsNumber()
    @IsDefined()
    readonly secSongDuration: number;


    /**
     * Specify the names of the people who produce the audio file.
     */
    @IsString()
    @IsOptional()
    readonly singer?: string;


    /**
     * Set this option to ***true*** to specify that the audio file is being selected for playing.
     */
    @IsBoolean()
    @IsOptional()
    readonly isSelected?: boolean;


    /**
     * Set this option to ***true*** to specify that the audio file is excluded from the playlist.
     */
    @IsBoolean()
    @IsOptional()
    readonly isExcludedFromActivePlaylist?: boolean;


    /**
     * Specify the piece of code that will be executed when users press the audio file.
     */
    readonly onPress?: GestureResponderEventHandler;
}

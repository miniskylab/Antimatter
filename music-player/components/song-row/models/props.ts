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

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly songName: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @Min(0)
    @IsNumber()
    @IsDefined()
    readonly secSongDuration: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly singer?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isSelected?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isExcludedFromActivePlaylist?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPress?: GestureResponderEventHandler;
}

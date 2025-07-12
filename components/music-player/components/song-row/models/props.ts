import {
    ComponentProps,
    type GestureResponderEventHandler,
    IsBoolean,
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly songName: string;


    @Min(0)
    @IsNumber({allowNaN: true})
    @IsDefined()
    readonly secSongDuration: number;


    @IsString()
    @IsOptional()
    readonly singer?: string;


    @IsBoolean()
    @IsOptional()
    readonly isSelected?: boolean;


    @IsBoolean()
    @IsOptional()
    readonly isExcludedFromActivePlaylist?: boolean;


    readonly onPress?: GestureResponderEventHandler;
}

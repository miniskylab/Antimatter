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
    readonly audioName: string;


    @Min(0)
    @IsNumber({allowNaN: true})
    @IsDefined()
    readonly secAudioDuration: number;


    @IsNumber()
    @IsOptional()
    readonly dbAudioGain?: number;


    @IsNumber()
    @IsOptional()
    readonly rAudioPeak?: number;


    @IsString()
    @IsOptional()
    readonly artistName?: string;


    @IsBoolean()
    @IsOptional()
    readonly isSelected?: boolean;


    @IsBoolean()
    @IsOptional()
    readonly isExcludedFromActivePlaylist?: boolean;


    readonly onPress?: GestureResponderEventHandler;
}

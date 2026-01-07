import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {HighlightColor} from "../enums";

export class ShortWeatherData
{
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly value: string;


    @IsEnum(HighlightColor)
    @IsOptional()
    readonly highlightColor?: HighlightColor;
}

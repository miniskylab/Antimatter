import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {SimpleWeatherData} from "../components";

export class ShortWeatherData
{
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly value: string;


    @IsEnum(SimpleWeatherData.HighlightColor)
    @IsOptional()
    readonly highlightColor?: SimpleWeatherData.HighlightColor;
}

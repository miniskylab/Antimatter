import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {SimpleWeatherData} from "../components";

export class TemperatureData
{
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly feelsLikeTemperatureLabel: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly feelsLikeTemperatureValue: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly minTemperatureLabel: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly minTemperatureValue: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly currentTemperatureLabel: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly currentTemperatureValue: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly maxTemperatureLabel: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly maxTemperatureValue: string;


    @IsEnum(SimpleWeatherData.HighlightColor)
    @IsOptional()
    readonly highlightColor?: SimpleWeatherData.HighlightColor;
}

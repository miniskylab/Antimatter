import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {SimpleWeatherData} from "../components";

/**
 * Represents objects that carry temperature data.
 */
export class TemperatureData
{
    /**
     * Specify the text that will be used for identification or description of the current feels-like temperature of the day.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly feelsLikeTemperatureLabel: string;


    /**
     * Specify the current feels-like temperature of the day.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly feelsLikeTemperatureValue: string;


    /**
     * Specify the text that will be used for identification or description of the lowest temperature recorded during the day.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly minTemperatureLabel: string;


    /**
     * Specify the lowest temperature recorded during the day.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly minTemperatureValue: string;


    /**
     * Specify the text that will be used for identification or description of the current temperature of the day.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly currentTemperatureLabel: string;


    /**
     * Specify the current temperature of the day.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly currentTemperatureValue: string;


    /**
     * Specify the text that will be used for identification or description of the highest temperature recorded during the day.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly maxTemperatureLabel: string;


    /**
     * Specify the highest temperature recorded during the day.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly maxTemperatureValue: string;


    /**
     * Specify the highlight color associated with the temperature data.
     *
     * @type HighlightColor
     */
    @IsEnum(SimpleWeatherData.HighlightColor)
    @IsOptional()
    readonly highlightColor?: SimpleWeatherData.HighlightColor;
}

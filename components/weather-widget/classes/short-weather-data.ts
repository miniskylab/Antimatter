import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {SimpleWeatherData} from "../components";

/**
 * Represents objects that carry short weather data.
 */
export class ShortWeatherData
{
    /**
     * Specify the icon associated with the short weather data.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    /**
     * Specify the text associated with the short weather data.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly value: string;


    /**
     * Specify the highlight color associated with the short weather data.
     *
     * @type HighlightColor
     */
    @IsEnum(SimpleWeatherData.HighlightColor)
    @IsOptional()
    readonly highlightColor?: SimpleWeatherData.HighlightColor;
}

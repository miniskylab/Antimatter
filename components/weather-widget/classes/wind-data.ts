import {IsDefined, IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {SimpleWeatherData} from "../components";

/**
 * Represents objects that carry wind data.
 */
export class WindData
{
    /**
     * Specify the icon associated with the wind data.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    /**
     * Specify wind speed and gusts.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly speedAndGusts: string;


    /**
     * Specify wind direction.
     */
    @Max(360)
    @Min(0)
    @IsNumber()
    @IsDefined()
    readonly direction: number;


    /**
     * Specify the highlight color associated with the wind data.
     *
     * @type HighlightColor
     */
    @IsEnum(SimpleWeatherData.HighlightColor)
    @IsOptional()
    readonly highlightColor?: SimpleWeatherData.HighlightColor;
}

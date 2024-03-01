import {IsDefined, IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {SimpleWeatherData} from "../components";

export class WindData
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly speed: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @Max(360)
    @Min(0)
    @IsNumber()
    @IsDefined()
    readonly direction: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type HighlightColor
     */
    @IsEnum(SimpleWeatherData.HighlightColor)
    @IsOptional()
    readonly highlightColor?: SimpleWeatherData.HighlightColor;
}

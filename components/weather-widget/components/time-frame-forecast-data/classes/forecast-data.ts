import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {HighlightColor} from "../enums";

/**
 * Represents objects that carry weather forecast data.
 */
export class ForecastData
{
    /**
     * Specify the icon associated with the forecast data.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    /**
     * Specify the text associated with the forecast data.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly value: string;


    /**
     * Specify the highlight color associated with the forecast data.
     *
     * @type HighlightColor
     */
    @IsEnum(HighlightColor)
    @IsOptional()
    readonly highlightColor?: HighlightColor;
}

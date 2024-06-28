import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {HighlightColor} from "../enums";

export class ForecastData
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
    readonly value: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type HighlightColor
     */
    @IsEnum(HighlightColor)
    @IsOptional()
    readonly highlightColor?: HighlightColor;
}

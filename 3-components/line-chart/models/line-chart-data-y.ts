import {ArrayNotEmpty, IsArray, IsDefined, IsEnum, IsHexColor, IsString} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";
import {LineChartLineStyle} from "./line-chart-line-style";

export class LineChartDataY
{
    /**
     *
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    readonly values: number[];


    /**
     *
     */
    @IsHexColor()
    @IsString()
    @IsOptional()
    readonly lineColor?: string;


    /**
     *
     */
    @IsEnum(LineChartLineStyle)
    @IsOptional()
    readonly lineStyle?: LineChartLineStyle;
}

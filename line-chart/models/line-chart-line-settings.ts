import {ArrayNotEmpty, IsArray, IsDefined, IsEnum, IsString} from "@miniskylab/antimatter/validation";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {LineChartCoordinate} from "./line-chart-coordinate";
import {LineChartLineStyle} from "./line-chart-line-style";

export class LineChartLineSettings
{
    /**
     *
     */
    @IsString()
    @IsOptional()
    color?: string;


    /**
     *
     */
    @IsEnum(LineChartLineStyle)
    @IsOptional()
    style?: LineChartLineStyle;


    /**
     *
     */
    @ValidateNested()
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @Type(() => LineChartCoordinate)
    coordinates: LineChartCoordinate[];
}

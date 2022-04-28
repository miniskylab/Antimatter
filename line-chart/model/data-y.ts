import {ArrayNotEmpty, IsArray, IsDefined, IsEnum, IsHexColor, IsString} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";
import {LineStyle} from "./line-style";

export class DataY
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
    @IsEnum(LineStyle)
    @IsOptional()
    readonly lineStyle?: LineStyle;
}

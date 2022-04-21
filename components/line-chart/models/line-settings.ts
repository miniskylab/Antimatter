import {ArrayNotEmpty, IsArray, IsDefined, IsEnum, IsString} from "@miniskylab/antimatter-class-validator";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Coordinate} from "./coordinate";
import {LineStyle} from "./line-style";

export class LineSettings
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
    @IsEnum(LineStyle)
    @IsOptional()
    style?: LineStyle;


    /**
     *
     */
    @ValidateNested()
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @Type(() => Coordinate)
    coordinates: Coordinate[];
}

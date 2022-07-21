import {ArrayNotEmpty, IsArray, IsDefined, IsEnum, IsString} from "@miniskylab/antimatter-class-validator";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Coordinate} from "./coordinate";
import {LineStyle} from "./line-style";

export class LineSettings
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    color?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsEnum(LineStyle)
    @IsOptional()
    style?: LineStyle;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested()
    @Type(() => Coordinate)
    coordinates: Coordinate[];
}

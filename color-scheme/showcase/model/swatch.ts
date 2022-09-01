import {ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";
import {Color} from "./color";

export class Swatch
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly title: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly subTitle?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    readonly colors: Color[];
}

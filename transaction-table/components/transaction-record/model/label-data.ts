import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";
import {LabelType} from "./label-type";

export class LabelData
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly icon?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type LabelType
     */
    @IsEnum(LabelType)
    @IsOptional()
    readonly type?: LabelType;
}

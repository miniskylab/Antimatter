import {IsDate, IsDefined, IsNumber, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Tag} from "./tag";

export class Data
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly name?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsDefined()
    readonly amount: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly tags?: Record<string, Tag>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsDefined()
    readonly executedDate: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly modifiedDate?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;
}

import {IsDate, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Tag} from "./tag";

/**
 * Represents data of a particular reminder item.
 */
export class Data
{
    /**
     * Specify the name of the reminder item.
     */
    @IsString()
    @IsOptional()
    readonly name?: string;


    /**
     * Specify the tags that can be assigned to the reminder item.
     */
    @IsOptional()
    readonly tags?: Record<string, Tag>;


    /**
     * Specify the date and time at which the reminder item was last modified.
     */
    @IsDate()
    @IsOptional()
    readonly modifiedDate?: Date;


    /**
     * Specify the date and time at which the reminder item was created.
     */
    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;
}

import {IsDate, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Tag} from "./tag";

/**
 * Represents data of a particular reminder.
 */
export class Data
{
    /**
     * Specify the name of the reminder.
     */
    @IsString()
    @IsOptional()
    readonly name?: string;


    /**
     * Specify the tags that can be assigned to the reminder.
     */
    @IsOptional()
    readonly tags?: Record<string, Tag>;


    /**
     * Specify the date and time at which the reminder was last modified.
     */
    @IsDate()
    @IsOptional()
    readonly modifiedDate?: Date;


    /**
     * Specify the date and time at which the reminder was created.
     */
    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;
}

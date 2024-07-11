import {IsDate, IsDefined, IsNumber, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Tag} from "./tag";

/**
 * Represents data of a particular transaction.
 */
export class Data
{
    /**
     * Specify the name of the transaction.
     */
    @IsString()
    @IsOptional()
    readonly name?: string;


    /**
     * Specify the transaction amount.
     */
    @IsNumber()
    @IsDefined()
    readonly amount: number;


    /**
     * Specify the tags that can be assigned to the transaction.
     */
    @IsOptional()
    readonly tags?: Record<string, Tag>;


    /**
     * Specify the date and time at which the transaction was executed.
     */
    @IsDate()
    @IsDefined()
    readonly executedDate: Date;


    /**
     * Specify the date and time at which the transaction was last modified.
     */
    @IsDate()
    @IsOptional()
    readonly modifiedDate?: Date;


    /**
     * Specify the date and time at which the transaction was created.
     */
    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;
}

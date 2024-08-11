import {IsDate, IsNumber, IsString, Matches, Min} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Tag} from "./tag";

export class Data
{
    @IsString()
    @IsOptional()
    readonly name?: string;


    @Matches(
        "^Done$|^$|" +
        "^(\\*|(\\*\\/)?([1-5]?[0-9])) " +
        "(\\*|([1-5]?[0-9])) " +
        "(\\*|(\\*\\/)?([0-9]|1[0-9]|2[0-3])) " +
        "(\\*|(\\*\\/)?([1-9]|[12][0-9]|3[01])) " +
        "(\\*|(\\*\\/)?([1-9]|1[0-2])) " +
        "\\? " +
        "(\\*|(\\*\\/)?(20[0-9][0-9]))$"
    )
    @IsString()
    @IsOptional()
    readonly recurrencePattern?: string;


    @Min(0)
    @IsNumber()
    @IsOptional()
    readonly notificationIntervalInHours?: number;


    @IsOptional()
    readonly tags?: Record<string, Tag>;


    @IsDate()
    @IsOptional()
    readonly modifiedDate?: Date;


    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;
}

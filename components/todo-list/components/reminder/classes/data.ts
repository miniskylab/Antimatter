import {IsDate, IsNumber, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import type {Tag} from "../types";

export class Data
{
    @IsString()
    @IsOptional()
    readonly name?: string;


    @IsString()
    @IsOptional()
    readonly recurrencePattern?: string;


    @IsNumber({allowNaN: true})
    @IsOptional()
    readonly notificationInterval?: number;


    @IsOptional()
    readonly tags?: Record<string, Tag>;


    @IsDate()
    @IsOptional()
    readonly modifiedDate?: Date;


    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;
}

import {IsDate, IsDefined, IsEnum, IsNumber, IsString, Min} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Status} from "../enums";
import type {Tag} from "../types";

export class Data
{
    @IsString()
    @IsOptional()
    readonly name?: string;


    @IsString()
    @IsOptional()
    readonly recurrencePattern?: string;


    @Min(1)
    @IsNumber()
    @IsOptional()
    readonly notificationInterval?: number;


    @IsOptional()
    readonly tags?: Record<string, Tag>;


    @IsEnum(Status)
    @IsDefined()
    readonly status: Status;


    @IsDate()
    @IsOptional()
    readonly dueDate?: Date;


    @IsDate()
    @IsOptional()
    readonly modifiedDate?: Date;


    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;
}

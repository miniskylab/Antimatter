import {IsDate, IsDefined, IsNumber, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Tag} from "./tag";

export class Data
{
    @IsString()
    @IsOptional()
    readonly name?: string;


    @IsNumber()
    @IsDefined()
    readonly amount: number;


    @IsOptional()
    readonly tags?: Record<string, Tag>;


    @IsDate()
    @IsDefined()
    readonly executedDate: Date;


    @IsDate()
    @IsOptional()
    readonly modifiedDate?: Date;


    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;
}

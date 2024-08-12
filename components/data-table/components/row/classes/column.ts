import {IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";

export class Column
{
    @IsString()
    @IsOptional()
    readonly name?: string;


    @IsString()
    @IsOptional()
    readonly placeholder?: string;
}

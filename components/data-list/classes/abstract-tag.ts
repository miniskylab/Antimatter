import {IsDefined, IsNotEmpty, IsPositive, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";

export abstract class AbstractTag
{
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly icon?: string;


    @IsPositive()
    @IsOptional()
    readonly order?: number;
}

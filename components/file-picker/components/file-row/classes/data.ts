import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {Status} from "../enums";

export class Data
{
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly id: string;


    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly title: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly subtitle: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly uri: string;


    @IsEnum(Status)
    @IsOptional()
    readonly status?: Status;
}

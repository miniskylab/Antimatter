import {IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {MenuItemStatus} from "../enums";

export class MenuItem
{
    @IsEnum(MenuItemStatus)
    @IsOptional()
    readonly status?: MenuItemStatus;


    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly displayText?: string;


    @IsString({each: true})
    @IsOptional()
    readonly context?: string[];
}

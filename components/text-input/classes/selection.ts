import {IsDefined, IsNumber} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";

export class Selection
{
    @IsNumber()
    @IsDefined()
    readonly start: number;


    @IsNumber()
    @IsOptional()
    readonly end?: number;
}

import {IsBoolean, IsDefined, IsMultipleOf, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";

export class PipsSettings
{
    @IsPositive()
    @IsNumber()
    @IsDefined()
    readonly step: number;


    @IsMultipleOf("step")
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly milestoneStep?: number;


    @IsBoolean()
    @IsOptional()
    readonly canSnapToPip?: boolean;
}

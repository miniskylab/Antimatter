import {CSS} from "@miniskylab/antimatter/infrastructure";
import {IsBoolean, IsDefined, IsMultipleOf, IsNumber, IsPositive} from "@miniskylab/antimatter/validation";
import {IsOptional} from "class-validator";

export class RangeSliderPipSettings
{
    readonly variant?: CSS;


    /**
     *
     */
    @IsPositive()
    @IsNumber()
    @IsDefined()
    readonly step: number;


    /**
     *
     */
    @IsMultipleOf("step")
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly milestoneStep?: number;


    /**
     *
     */
    @IsBoolean()
    @IsOptional()
    readonly canSnapToPip?: boolean;
}

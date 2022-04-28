import {IsBoolean, IsDefined, IsMultipleOf, IsNumber, IsPositive} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";

export class PipSettings
{
    readonly variant?: Record<string, string>;


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

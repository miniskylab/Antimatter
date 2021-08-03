import {CSS} from "antimatter/infrastructures";
import {IsBoolean, IsDefined, IsMultipleOf, IsNumber, IsPositive} from "antimatter/validation";
import {IsOptional} from "class-validator";

export class CircularSliderPipSettings
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

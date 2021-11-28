import {IsBoolean, IsDefined, IsMultipleOf, IsNumber, IsPositive} from "@miniskylab/antimatter-class-validator";
import {ComponentStyles} from "@miniskylab/antimatter-component";
import {IsOptional} from "class-validator";

export class CircularSliderPipSettings
{
    readonly variant?: ComponentStyles;


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

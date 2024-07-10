import {IsBoolean, IsDefined, IsMultipleOf, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";

/**
 * Determines how the marking present along the range slider is displayed.
 */
export class PipsSettings
{
    /**
     * Specify the distance between two consecutive pips.
     */
    @IsPositive()
    @IsNumber()
    @IsDefined()
    readonly step: number;


    /**
     * Specify the distance between two consecutive long pips.
     */
    @IsMultipleOf("step")
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly milestoneStep?: number;


    /**
     * Set this option to ***true*** to restrict the movement of the knob slider to the defined steps.
     */
    @IsBoolean()
    @IsOptional()
    readonly canSnapToPip?: boolean;
}

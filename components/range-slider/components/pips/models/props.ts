import {
    ComponentProps,
    IsDefined,
    IsGreaterThanOrEqualTo,
    IsLessThanOrEqualTo,
    IsMultipleOf,
    IsNumber,
    IsPositive
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the minimum value of the pips.
     */
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsDefined()
    readonly minValue: number;


    /**
     * Specify the maximum value of the pips.
     */
    @IsGreaterThanOrEqualTo("minValue")
    @IsNumber()
    @IsDefined()
    readonly maxValue: number;


    /**
     * Specify the distance between two consecutive pips.
     */
    @IsPositive()
    @IsNumber()
    @IsDefined()
    readonly step: number;


    /**
     * Specify the minimum value of the selectable range.
     */
    @IsGreaterThanOrEqualTo("minValue")
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsOptional()
    readonly startValue?: number;


    /**
     * Specify the maximum value of the selectable range.
     */
    @IsGreaterThanOrEqualTo("minValue")
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsOptional()
    readonly endValue?: number;


    /**
     * Specify the distance between two consecutive long pips.
     */
    @IsMultipleOf("step")
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly milestoneStep?: number;
}

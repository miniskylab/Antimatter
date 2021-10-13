import {ComponentName, ComponentProps} from "@miniskylab/antimatter/infrastructure";
import {
    IsDefined,
    IsEnum,
    IsGreaterThanOrEqualTo,
    IsLessThanOrEqualTo,
    IsMultipleOf,
    IsNumber,
    IsPositive
} from "@miniskylab/antimatter/validation";
import {IsOptional} from "class-validator";
import {PipsShape} from "./pips-shape";

@ComponentName("Pips")
export class PipsComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsDefined()
    readonly minValue: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsGreaterThanOrEqualTo("minValue")
    @IsNumber()
    @IsDefined()
    readonly maxValue: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsNumber()
    @IsDefined()
    readonly step: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsGreaterThanOrEqualTo("minValue")
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsOptional()
    readonly startValue?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsGreaterThanOrEqualTo("minValue")
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsOptional()
    readonly endValue?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsMultipleOf("step")
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly milestoneStep?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type PipsShape
     */
    @IsEnum(PipsShape)
    @IsOptional()
    readonly shape?: PipsShape;
}

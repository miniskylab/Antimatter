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
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsDefined()
    readonly minValue: number;


    @IsGreaterThanOrEqualTo("minValue")
    @IsNumber()
    @IsDefined()
    readonly maxValue: number;


    @IsPositive()
    @IsNumber()
    @IsDefined()
    readonly step: number;


    @IsGreaterThanOrEqualTo("minValue")
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsOptional()
    readonly startValue?: number;


    @IsGreaterThanOrEqualTo("minValue")
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsOptional()
    readonly endValue?: number;


    @IsMultipleOf("step")
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly milestoneStep?: number;
}

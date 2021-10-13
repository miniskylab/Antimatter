import {ComponentName, ComponentProps} from "@miniskylab/antimatter/infrastructure";
import {
    IsBoolean,
    IsGreaterThanOrEqualTo,
    IsInteger,
    IsLessThanOrEqualTo,
    IsNumber,
    IsPositive,
    IsString
} from "@miniskylab/antimatter/validation";
import {IsOptional} from "class-validator";
import {FocusEventHandler, KeyboardEventHandler, PointerEventHandler} from "react";

@ComponentName("Numeric Input Field")
export class NumericInputFieldComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly autoFocus?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly placeholderText?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsLessThanOrEqualTo("maxValue")
    @IsGreaterThanOrEqualTo("minValue")
    @IsNumber()
    @IsOptional()
    readonly defaultValue?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsOptional()
    readonly minValue?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsGreaterThanOrEqualTo("minValue")
    @IsNumber()
    @IsOptional()
    readonly maxValue?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly maximumFractionDigits?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly maximumDigitCount?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly showPlusSymbolForPositiveNumber?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onBlur?: FocusEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onFocus?: FocusEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPointerDown?: PointerEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onKeyDown?: KeyboardEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newValue: number) => void;
}

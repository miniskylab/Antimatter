import {
    ComponentName,
    ComponentProps,
    IsBoolean,
    IsInteger,
    IsNumber,
    IsPositive,
    IsString,
    TextInputFocusEventHandler,
    TextInputKeyPressEventHandler
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {NumericKeyboardTypeOptions} from "../types";
import {NumericInputFieldStyle} from "./style";

@ComponentName("Numeric Input Field")
export class NumericInputFieldProps extends ComponentProps<NumericInputFieldStyle>
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
    readonly placeholder?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsOptional()
    readonly defaultValue?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsOptional()
    readonly minValue?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsOptional()
    readonly maxValue?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly maximumFractionDigitCount?: number;


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
    @IsBoolean()
    @IsOptional()
    readonly treatEmptyInputAsZero?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly selectTextOnFocus?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly keyboardType?: NumericKeyboardTypeOptions;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onBlur?: TextInputFocusEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onFocus?: TextInputFocusEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onKeyPress?: TextInputKeyPressEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newValue: number) => void;
}

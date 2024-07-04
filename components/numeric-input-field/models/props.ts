import {
    ComponentName,
    ComponentProps,
    IsBoolean,
    IsInteger,
    IsNumber,
    IsString,
    Min,
    TextInputFocusEventHandler,
    TextInputKeyPressEventHandler
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import type {NumericKeyboardTypeOptions} from "../types";
import {type NumericInputFieldStyle} from "./style";

@ComponentName("Numeric Input Field")
export class NumericInputFieldProps extends ComponentProps<NumericInputFieldStyle>
{
    /**
     * Set this option to ***true*** to specify that the numeric input field should automatically get focused when it is mounted.
     */
    @IsBoolean()
    @IsOptional()
    readonly autoFocus?: boolean;


    /**
     * Specify the text that will be displayed before input has been entered.
     */
    @IsString()
    @IsOptional()
    readonly placeholder?: string;


    /**
     * Specify the initial value that has been entered into the numeric input field.
     */
    @IsNumber()
    @IsOptional()
    readonly defaultValue?: number;


    /**
     * Specify the minimum value that can be entered into the numeric input field.
     */
    @IsNumber()
    @IsOptional()
    readonly minValue?: number;


    /**
     * Specify the maximum value that can be entered into the numeric input field.
     */
    @IsNumber()
    @IsOptional()
    readonly maxValue?: number;


    /**
     * Specify the maximum number of fraction digits that can be entered into the numeric input field.
     */
    @Min(0)
    @IsInteger()
    @IsOptional()
    readonly maximumFractionDigitCount?: number;


    /**
     * Specify the maximum number of digits that can be entered into the numeric input field.
     */
    @Min(0)
    @IsInteger()
    @IsOptional()
    readonly maximumDigitCount?: number;


    /**
     * Set this option to ***true*** to make the numeric input field display the `+` symbol in front of non-negative numbers.
     */
    @IsBoolean()
    @IsOptional()
    readonly showPlusSymbolForPositiveNumber?: boolean;


    /**
     * Set this option to ***true*** to make the numeric input field treat empty input as number ***0***.
     */
    @IsBoolean()
    @IsOptional()
    readonly treatEmptyInputAsZero?: boolean;


    /**
     * Set this option to ***true*** to specify that the entire entered number should automatically be selected when the numeric input field
     * has received focus.
     */
    @IsBoolean()
    @IsOptional()
    readonly selectTextOnFocus?: boolean;


    /**
     * <b className="property-description__supported-platform-section">
     *     Supported Platforms:
     *     <b className="property-description__supported-platform-value--iOS">iOS</b>,
     *     <b className="property-description__supported-platform-value--android">Android</b>
     * </b>
     *
     * Specify which keyboard to open when the numeric input field has received focus.
     */
    @IsOptional()
    readonly keyboardType?: NumericKeyboardTypeOptions;


    /**
     * Specify the piece of code that will be executed when the numeric input field has lost focus.
     */
    readonly onBlur?: TextInputFocusEventHandler;


    /**
     * Specify the piece of code that will be executed when the numeric input field has received focus.
     */
    readonly onFocus?: TextInputFocusEventHandler;


    /**
     * Specify the piece of code that will be executed when a key is pressed while the numeric input field is being focused.
     */
    readonly onKeyPress?: TextInputKeyPressEventHandler;


    /**
     * Specify the piece of code that will be executed when the entered number changes.
     */
    readonly onChange?: (newValue: number) => void;
}

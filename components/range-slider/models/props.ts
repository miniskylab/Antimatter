import {
    ComponentName,
    ComponentProps,
    IsBoolean,
    IsDefined,
    IsEnum,
    IsGreaterThanOrEqualTo,
    IsLessThanOrEqualTo,
    IsNumber
} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {PipsSettings} from "../classes";
import {type RangeSliderStyle} from "./style";

@ComponentName("Range Slider")
export class RangeSliderProps extends ComponentProps<RangeSliderStyle>
{
    /**
     * Specify the minimum value of the range slider.
     */
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsDefined()
    readonly minValue: number;


    /**
     * Specify the maximum value of the range slider.
     */
    @IsGreaterThanOrEqualTo("minValue")
    @IsNumber()
    @IsDefined()
    readonly maxValue: number;


    /**
     * Specify the selected value of the range slider.
     */
    @IsGreaterThanOrEqualTo("minValue")
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsDefined()
    readonly value: number;


    /**
     * Specify the settings of the marking present along the range slider.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => PipsSettings)
    readonly pipsSettings?: PipsSettings;


    /**
     * Specify the icon that will be inscribed onto the knob of the range slider.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly knobIcon?: DefaultIconSet;


    /**
     * Set this option to ***true*** to prevent users from moving the knob slider.
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;


    /**
     * Specify the piece of code that will be executed when the selected value changes.
     */
    readonly onChange?: (newValue: number) => void;
}

import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {IsBoolean, IsDefined, IsGreaterThanOrEqualTo, IsLessThanOrEqualTo, IsNumber} from "@miniskylab/antimatter-class-validator";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {RangeSliderPipSettings} from "./range-slider-pip-settings";

@ComponentName("Range Slider")
export class RangeSliderComponentProps extends ComponentProps
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
    @IsGreaterThanOrEqualTo("minValue")
    @IsLessThanOrEqualTo("maxValue")
    @IsNumber()
    @IsDefined()
    readonly value: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @IsOptional()
    @Type(() => RangeSliderPipSettings)
    readonly pipSettings?: RangeSliderPipSettings;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly canInteractWith?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newValue: number) => void;
}

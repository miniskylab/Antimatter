import {IsDefined, IsGreaterThanOrEqualTo, IsLessThanOrEqualTo, IsNumber} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {CircularSliderPipSettings} from "./circular-slider-pip-settings";

@ComponentName("Circular Slider")
export class CircularSliderComponentProps extends ComponentProps
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
    @ValidateNested()
    @IsOptional()
    @Type(() => CircularSliderPipSettings)
    readonly pipSettings?: CircularSliderPipSettings;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newStartValue: number, newEndValue: number) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPointerUp?: () => void;
}

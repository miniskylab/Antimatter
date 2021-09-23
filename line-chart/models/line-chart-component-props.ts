import {ComponentName, ComponentProps} from "@miniskylab/antimatter/infrastructures";
import {ArrayNotEmpty, IsArray, IsDefined} from "@miniskylab/antimatter/validation";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {LineChartDataX} from "./line-chart-data-x";
import {LineChartDataY} from "./line-chart-data-y";

@ComponentName("Line Chart")
export class LineChartComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @Type(() => LineChartDataX)
    readonly dataX: LineChartDataX[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @Type(() => LineChartDataY)
    readonly dataY: LineChartDataY[];
}

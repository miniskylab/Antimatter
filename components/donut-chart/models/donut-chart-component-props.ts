import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {IsNumber, IsString} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";

@ComponentName("Donut Chart")
export class DonutChartComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsOptional()
    readonly pctValue?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly description?: string;
}

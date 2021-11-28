import {IsDate, IsInteger} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {IsOptional} from "class-validator";

@ComponentName("Month View")
export class MonthViewComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    selectedMonth?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsInteger()
    @IsOptional()
    displayingYear?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    onMonthClick?: (month: Date) => void;
}

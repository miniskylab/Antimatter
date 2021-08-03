import {ComponentName, ComponentProps} from "antimatter/infrastructures";
import {IsDate, IsInteger} from "antimatter/validation";
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
    onMonthClicked?: (clickedMonth: Date) => void;
}

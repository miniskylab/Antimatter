import {ComponentName, ComponentProps, IsDate} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {CalendarStyle} from "./style";

@ComponentName("Calendar")
export class CalendarProps extends ComponentProps<CalendarStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly selectedDate?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectedDateChange?: (newlySelectedDate: Date | undefined) => void;
}

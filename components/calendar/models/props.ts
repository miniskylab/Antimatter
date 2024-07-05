import {ComponentName, ComponentProps, IsDate} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type CalendarStyle} from "./style";

@ComponentName("Calendar")
export class CalendarProps extends ComponentProps<CalendarStyle>
{
    /**
     * Specify the selected date.
     */
    @IsDate()
    @IsOptional()
    readonly selectedDate?: Date;


    /**
     * Specify the piece of code that will be executed when the selected date changes.
     */
    readonly onSelectedDateChange?: (newlySelectedDate: Date | undefined) => void;
}

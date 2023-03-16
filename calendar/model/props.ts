import {ComponentName, ComponentProps, IsArray, IsDate} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {HighlightedDate} from "./highlighted-date";
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
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => HighlightedDate)
    readonly highlightedDates?: HighlightedDate[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectedDateChange?: (newlySelectedDate: Date) => void;
}

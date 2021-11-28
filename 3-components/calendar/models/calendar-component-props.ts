import {IsDate} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {FocusEventHandler} from "react";
import {CalendarComponentVariant} from "./calendar-component-variant";

@ComponentName("Calendar")
export class CalendarComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @IsOptional()
    @Type(() => CalendarComponentVariant)
    readonly componentVariant?: CalendarComponentVariant;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly selectedDate?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newlySelectedDate: Date) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onBlur?: FocusEventHandler;
}

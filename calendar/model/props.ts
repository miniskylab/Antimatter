import {IsDate} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IsOptional} from "class-validator";
import {FocusEventHandler} from "react";

@ComponentName("Calendar")
export class Props extends ComponentProps
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
    readonly onChange?: (newlySelectedDate: Date) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onBlur?: FocusEventHandler;
}

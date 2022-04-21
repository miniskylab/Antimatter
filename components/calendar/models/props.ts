import {IsDate} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {FocusEventHandler} from "react";
import {ComponentVariant} from "./component-variant";

@ComponentName("Calendar")
export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @IsOptional()
    @Type(() => ComponentVariant)
    readonly componentVariant?: ComponentVariant;


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

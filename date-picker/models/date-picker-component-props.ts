import {ComponentName, ComponentProps} from "antimatter/infrastructures";
import {IsBoolean, IsDate, IsString} from "antimatter/validation";
import {IsOptional} from "class-validator";
import {FocusEventHandler, KeyboardEventHandler, PointerEventHandler} from "react";

@ComponentName("Date Picker")
export class DatePickerComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly defaultSelectedDate?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly autoFocus?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly placeholderText?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onBlur?: FocusEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onFocus?: FocusEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPointerDown?: PointerEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onKeyDown?: KeyboardEventHandler<HTMLInputElement>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newlySelectedDate: Date) => void;
}

import {ComponentName, ComponentProps, DateFormat, IsBoolean, IsDate, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {DatePickerStyle} from "./style";

@ComponentName("Date Picker")
export class DatePickerProps extends ComponentProps<DatePickerStyle>
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
    @IsString()
    @IsOptional()
    readonly placeholder?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DateFormat
     */
    @IsEnum(DateFormat)
    @IsOptional()
    readonly dateFormat?: DateFormat;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly calendarIsOpen?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly focusable?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly autoFocus?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly editable?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onAddonPress?: () => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectedDateChange?: (newlySelectedDate: Date) => void;
}

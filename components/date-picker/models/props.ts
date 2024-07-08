import {ComponentName, ComponentProps, DateFormat, IsBoolean, IsDate, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type DatePickerStyle} from "./style";

@ComponentName("Date Picker")
export class DatePickerProps extends ComponentProps<DatePickerStyle>
{
    /**
     * Specify the selected date.
     */
    @IsDate()
    @IsOptional()
    readonly selectedDate?: Date;


    /**
     * Specify the text that will be displayed before input has been entered.
     */
    @IsString()
    @IsOptional()
    readonly placeholder?: string;


    /**
     * Specify the way the selected date is displayed.
     *
     * @type DateFormat
     */
    @IsEnum(DateFormat)
    @IsOptional()
    readonly dateFormat?: DateFormat;


    /**
     * Set this option to ***true*** to open the calendar allowing users to select a date from.
     */
    @IsBoolean()
    @IsOptional()
    readonly isCalendarOpen?: boolean;


    /**
     * Set this option to ***false*** to prevent the date picker from receiving focus.
     */
    @IsBoolean()
    @IsOptional()
    readonly focusable?: boolean;


    /**
     * Set this option to ***true*** to specify that the date picker should automatically get focused when it is mounted.
     */
    @IsBoolean()
    @IsOptional()
    readonly autoFocus?: boolean;


    /**
     * Set this option to ***false*** to prevent users from editing the entered text in the date picker.
     */
    @IsBoolean()
    @IsOptional()
    readonly editable?: boolean;


    /**
     * Specify the piece of code that will be executed when users press the addon to open the calendar.
     */
    readonly onAddonPress?: () => void;


    /**
     * Specify the piece of code that will be executed when the selected date changes.
     */
    readonly onSelectedDateChange?: (newlySelectedDate: Date | undefined) => void;
}

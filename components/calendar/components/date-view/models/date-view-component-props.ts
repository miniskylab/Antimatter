import {IsArray, IsDate} from "@miniskylab/antimatter-class-validator";
import {ComponentProps} from "@miniskylab/antimatter-component";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {DateViewHighlightedDate} from "./date-view-highlighted-date";

export class DateViewComponentProps extends ComponentProps
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
    @IsDate()
    @IsOptional()
    readonly displayingMonth?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @IsArray()
    @IsOptional()
    @Type(() => DateViewHighlightedDate)
    readonly highlightedDates?: DateViewHighlightedDate[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onDateClick?: (date: Date) => void;
}

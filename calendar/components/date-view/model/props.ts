import {IsArray, IsDate} from "@miniskylab/antimatter-class-validator";
import {ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {HighlightedDate} from "./highlighted-date";

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
    @IsDate()
    @IsOptional()
    readonly displayingMonth?: Date;


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
    readonly onDateClick?: (date: Date) => void;
}

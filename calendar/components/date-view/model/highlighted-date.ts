import {IsBoolean, IsDefined, IsNumber, Max, Min} from "@miniskylab/antimatter-class-validator";
import {GregorianCalendar} from "@miniskylab/antimatter-typescript";
import {IsOptional} from "class-validator";

export class HighlightedDate
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @Max(GregorianCalendar.MAX_DAY)
    @Min(GregorianCalendar.MIN_DAY)
    @IsNumber()
    @IsDefined()
    readonly day: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @Max(GregorianCalendar.MAX_MONTH)
    @Min(GregorianCalendar.MIN_MONTH)
    @IsNumber()
    @IsOptional()
    readonly month?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @Max(GregorianCalendar.MAX_YEAR)
    @Min(GregorianCalendar.MIN_YEAR)
    @IsNumber()
    @IsOptional()
    readonly year?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly useLunarCalendar?: boolean;
}

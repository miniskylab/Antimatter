import {GregorianCalendar} from "../consts";
import {IsBoolean, IsDefined, IsNumber, Max, Min} from "../decorators";

export class LunarDate
{
    @Min(GregorianCalendar.MIN_YEAR)
    @Max(GregorianCalendar.MAX_YEAR)
    @IsNumber()
    @IsDefined()
    readonly year: number;


    @Min(GregorianCalendar.MIN_MONTH + 1)
    @Max(GregorianCalendar.MAX_MONTH + 1)
    @IsNumber()
    @IsDefined()
    readonly month: number;


    @Min(GregorianCalendar.MIN_DAY)
    @Max(GregorianCalendar.MAX_DAY - 1)
    @IsNumber()
    @IsDefined()
    readonly date: number;


    @IsBoolean()
    @IsDefined()
    readonly isLeapMonth: boolean;
}

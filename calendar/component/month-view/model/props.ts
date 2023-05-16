import {ComponentProps, IsArray, IsDate} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {MonthInfo} from "../type";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly selectedMonth?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => MonthInfo)
    readonly data?: MonthInfo[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onMonthPress?: (month: Date) => void;
}

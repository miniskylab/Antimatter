import {ComponentProps, IsArray, IsDate} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {MonthInfo} from "../classes";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the selected month.
     */
    @IsDate()
    @IsOptional()
    readonly selectedMonth?: Date;


    /**
     * Specify the data that will be used to render the month-view.
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => MonthInfo)
    readonly data?: MonthInfo[];


    /**
     * Specify the piece of code that will be executed when users press a month.
     */
    readonly onMonthPress?: (month: Date) => void;
}

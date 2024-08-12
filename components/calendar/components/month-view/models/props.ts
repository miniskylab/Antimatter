import {ComponentProps, IsArray, IsDate} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {MonthInfo} from "../classes";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsDate()
    @IsOptional()
    readonly selectedMonth?: Date;


    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => MonthInfo)
    readonly data?: MonthInfo[];


    readonly onMonthPress?: (month: Date) => void;
}

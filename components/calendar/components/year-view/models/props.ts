import {ComponentProps, IsArray, IsInteger} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {YearInfo} from "../classes";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the selected year.
     */
    @IsInteger()
    @IsOptional()
    readonly selectedYear?: number;


    /**
     * Specify the data that will be used to render the year-view.
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => YearInfo)
    readonly data?: YearInfo[];


    /**
     * Specify the piece of code that will be executed when users press a year.
     */
    readonly onYearPress?: (year: number) => void;
}

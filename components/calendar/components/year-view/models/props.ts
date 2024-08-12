import {ComponentProps, IsArray, IsInteger} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {YearInfo} from "../classes";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsInteger()
    @IsOptional()
    readonly selectedYear?: number;


    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => YearInfo)
    readonly data?: YearInfo[];


    readonly onYearPress?: (year: number) => void;
}

import {ComponentProps, IsArray, IsInteger} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {YearInfo} from "../type";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsInteger()
    @IsOptional()
    readonly selectedYear?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => YearInfo)
    readonly data?: YearInfo[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onYearClick?: (year: number) => void;
}

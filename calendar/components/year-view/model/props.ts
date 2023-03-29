import {ComponentProps, IsArray, IsInteger} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Style} from "./style";
import {YearInfo} from "./year-info";

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsInteger()
    @IsOptional()
    selectedYear?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => YearInfo)
    data?: YearInfo[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    onYearClick?: (year: number) => void;
}

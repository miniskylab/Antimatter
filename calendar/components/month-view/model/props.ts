import {ComponentProps, IsDate, IsInteger} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    selectedMonth?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsInteger()
    @IsOptional()
    displayingYear?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    onMonthClick?: (month: Date) => void;
}

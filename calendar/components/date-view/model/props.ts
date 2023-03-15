import {ComponentProps, IsDate} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly today?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly displayingMonth?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onDateClick?: (date: Date) => void;
}

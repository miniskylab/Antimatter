import {ComponentProps, IsDate} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {DateInfo} from "../types";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    readonly declare style: Style;

    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly today?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly data?: DateInfo[][];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onDatePress?: (date: Date) => void;
}

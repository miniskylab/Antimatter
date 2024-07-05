import {ComponentProps, IsDate} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {DateInfo} from "../classes";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the ***today*** date.
     */
    @IsDate()
    @IsOptional()
    readonly today?: Date;


    /**
     * Specify the data that will be used to render the date-view.
     */
    @IsOptional()
    readonly data?: DateInfo[][];


    /**
     * Specify the piece of code that will be executed when users press a date.
     */
    readonly onDatePress?: (date: Date) => void;
}

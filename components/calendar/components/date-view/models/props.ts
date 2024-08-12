import {ComponentProps, IsDate} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {DateInfo} from "../classes";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsDate()
    @IsOptional()
    readonly today?: Date;


    @IsOptional()
    readonly data?: DateInfo[][];


    readonly onDatePress?: (date: Date) => void;
}

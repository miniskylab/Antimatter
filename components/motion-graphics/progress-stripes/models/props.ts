import {ComponentName, ComponentProps, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ProgressStripesStyle} from "./style";

@ComponentName("Progress Stripes")
export class ProgressStripesProps extends ComponentProps<ProgressStripesStyle>
{
    /**
     * Specify the time, in milliseconds, the animation takes to complete one cycle.
     */
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly msAnimationDuration?: number;
}

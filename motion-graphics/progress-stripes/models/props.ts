import {ComponentName, ComponentProps, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ProgressStripesStyle} from "./style";

@ComponentName("Progress Stripes")
export class ProgressStripesProps extends ComponentProps<ProgressStripesStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly msAnimationDuration?: number;
}

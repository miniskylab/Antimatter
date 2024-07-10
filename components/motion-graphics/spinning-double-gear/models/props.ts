import {ComponentName, ComponentProps, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type SpinningDoubleGearStyle} from "./style";

@ComponentName("Spinning Double Gear")
export class SpinningDoubleGearProps extends ComponentProps<SpinningDoubleGearStyle>
{
    /**
     * Specify the time, in milliseconds, the animation takes to complete one cycle.
     */
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly msAnimationDuration?: number;
}

import {ComponentName, ComponentProps, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {SpinningDoubleGearStyle} from "./style";

@ComponentName("Spinning Double Gear")
export class SpinningDoubleGearProps extends ComponentProps<SpinningDoubleGearStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsNumber()
    @IsOptional()
    readonly msAnimationDuration?: number;
}

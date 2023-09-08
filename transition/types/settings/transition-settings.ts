import {IsEnum} from "@miniskylab/antimatter-framework";
import {IsDefined} from "class-validator";
import {Animation} from "../../enums";

export abstract class TransitionSettings
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Animation
     */
    @IsEnum(Animation)
    @IsDefined()
    readonly animation: Animation;
}

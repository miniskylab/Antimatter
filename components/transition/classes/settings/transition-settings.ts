import {IsEnum} from "@miniskylab/antimatter-framework";
import {IsDefined} from "class-validator";
import {Animation} from "../../enums";

/**
 * Determines how the transition operates or behaves.
 */
export abstract class TransitionSettings
{
    /**
     * Specify the animation that will be used for the transition.
     *
     * @type Animation
     */
    @IsEnum(Animation)
    @IsDefined()
    readonly animation: Animation;
}

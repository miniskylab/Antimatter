import {IsEnum, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {IsDefined} from "class-validator";
import {Animation, SlideDirection} from "../../enums";
import {TransitionSettings} from "./transition-settings";

export class SlideTransitionSettings extends TransitionSettings
{
    readonly animation = Animation.Slide;


    /**
     * Specify the direction of the slide transition.
     *
     * @type SlideDirection
     */
    @IsEnum(SlideDirection)
    @IsDefined()
    readonly slideDirection: SlideDirection;


    /**
     * Specify the distance, in pixels, of the slide transition.
     */
    @IsPositive()
    @IsNumber()
    @IsDefined()
    readonly pxSlideDistance: number;
}

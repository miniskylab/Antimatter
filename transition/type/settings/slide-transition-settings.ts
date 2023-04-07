import {IsEnum, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {IsDefined} from "class-validator";
import {Animation, SlideDirection} from "../../enum";
import {TransitionSettings} from "./transition-settings";

export class SlideTransitionSettings extends TransitionSettings
{
    readonly animation = Animation.Slide;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type SlideDirection
     */
    @IsEnum(SlideDirection)
    @IsDefined()
    readonly slideDirection: SlideDirection;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsNumber()
    @IsDefined()
    readonly pxSlideDistance: number;
}

import {IsEnum, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {IsDefined} from "class-validator";
import {Animation, SlideDirection} from "../../enums";
import {TransitionSettings} from "./transition-settings";

export class SlideTransitionSettings extends TransitionSettings
{
    readonly animation = Animation.Slide;


    @IsEnum(SlideDirection)
    @IsDefined()
    readonly slideDirection: SlideDirection;


    @IsPositive()
    @IsNumber()
    @IsDefined()
    readonly pxSlideDistance: number;
}

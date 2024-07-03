import {IsEnum} from "@miniskylab/antimatter-framework";
import {IsDefined} from "class-validator";
import {Animation, ZoomDirection} from "../../enums";
import {TransitionSettings} from "./transition-settings";

export class ZoomTransitionSettings extends TransitionSettings
{
    readonly animation = Animation.Zoom;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type ZoomDirection
     */
    @IsEnum(ZoomDirection)
    @IsDefined()
    readonly zoomDirection: ZoomDirection;
}

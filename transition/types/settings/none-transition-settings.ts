import {Animation} from "../../enums";
import {TransitionSettings} from "./transition-settings";

export class NoneTransitionSettings extends TransitionSettings
{
    readonly animation = Animation.None;
}

import {TimeFrame} from "./time-frame";
import {TransitionDirection} from "./transition-direction";
import {View} from "./view";

export class State
{
    readonly view: View;
    readonly timeFrame: TimeFrame;
    readonly transitionDirection: TransitionDirection;
}

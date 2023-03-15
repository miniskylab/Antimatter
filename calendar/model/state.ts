import {TimeFrame} from "./time-frame";
import {TransitionDirection} from "./transition-direction";
import {View} from "./view";

export type CalendarState = {
    readonly view: View;
    readonly today: Date;
    readonly timeFrame: TimeFrame;
    readonly transitionDirection: TransitionDirection;
}

import {TransitionDirection} from "./transition-direction";
import {View} from "./view";

export type CalendarState = {
    readonly today: Date;
    readonly activeView: View;
    readonly transitioningOutViews: View[];
    readonly transitionDirection: TransitionDirection;
}

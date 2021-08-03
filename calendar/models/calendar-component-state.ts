import {CalendarTimeFrame} from "./calendar-time-frame";
import {CalendarTransitionDirection} from "./calendar-transition-direction";
import {CalendarView} from "./calendar-view";

export class CalendarComponentState
{
    readonly view: CalendarView;
    readonly timeFrame: CalendarTimeFrame;
    readonly transitionDirection: CalendarTransitionDirection;
}

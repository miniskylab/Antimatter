import {CalendarContext, TransitionDirection} from "../model";
import {getViewId} from "./view";

export function getViewPosition(
    calendarContext: CalendarContext,
    viewId: string,
    viewWidth: number,
    isInitialPosition: boolean
): number
{
    const isActiveView = viewId === getViewId(calendarContext.state.activeView);
    const transitionInProgress = Object.entries(calendarContext.state.transitioningOutViews).length > 0;

    if (isInitialPosition && !transitionInProgress)
    {
        return 0;
    }

    switch (calendarContext.state.transitionDirection)
    {
        case TransitionDirection.Forward:
        {
            return isInitialPosition
                ? viewWidth
                : isActiveView
                    ? 0
                    : -viewWidth;
        }

        case TransitionDirection.Backward:
        {
            return isInitialPosition
                ? -viewWidth
                : isActiveView
                    ? 0
                    : viewWidth;
        }

        case TransitionDirection.Inward:
        case TransitionDirection.Outward:
        default:
        {
            return 0;
        }
    }
}


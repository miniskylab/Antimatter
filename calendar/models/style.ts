import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {TransitionStyle} from "@miniskylab/antimatter-transition";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Control, DateView, Header, MonthView, YearView} from "../components";
import {CalendarProps} from "./props";
import {CalendarState} from "./state";

export type CalendarStyle = (calendarProps: WithoutStyle<CalendarProps>, calendarState: CalendarState) => {
    Root?: ViewStyle;
    Header?: Header.Style;
    ViewTransition?: TransitionStyle;
    DateView?: DateView.Style;
    MonthView?: MonthView.Style;
    YearView?: YearView.Style;
    Control?: Control.Style;
};

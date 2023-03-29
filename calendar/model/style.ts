import {Styled} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "react-native";
import {Control, DateView, Header, MonthView, YearView} from "../components";
import {CalendarProps} from "./props";
import {CalendarState} from "./state";

export type CalendarStyle = (
    calendarProps: Styled<CalendarProps>,
    calendarState: CalendarState
) => {
    Root?: ViewStyle;
    Header?: Header.Style;
    ViewContainer?: ViewStyle;
    DateView?: DateView.Style;
    MonthView?: MonthView.Style;
    YearView?: YearView.Style;
    Control?: Control.Style;
};

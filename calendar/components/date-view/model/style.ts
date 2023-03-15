import {ButtonStyle} from "@miniskylab/antimatter-button";
import {Styled} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "react-native";
import {Props} from "./props";

export type Style = (dateViewProps: Styled<Props>) => {
    Root?: ViewStyle;
    WeekNo?: LabelStyle;
    DayOfWeek?: LabelStyle;
    WeekOfYear?: LabelStyle;
    DateContainer?: (date: Date) => {
        Container?: ButtonStyle;
        DateNumber?: LabelStyle;
        TodayText?: LabelStyle;
    };
};

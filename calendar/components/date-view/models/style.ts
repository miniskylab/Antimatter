import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (dateViewProps: WithoutStyle<Props>) => {
    Root?: ViewStyle;
    WeekNo?: LabelStyle;
    DayOfWeek?: LabelStyle;
    WeekOfYear?: LabelStyle;
    DateContainer?: PressableStyle;
    DateNumber?: LabelStyle;
    TodayText?: LabelStyle;
};

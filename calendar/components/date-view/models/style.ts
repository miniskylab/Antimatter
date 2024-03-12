import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (dateViewProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    WeekNo: TextStyle;
    DayOfWeek: TextStyle;
    WeekOfYear: TextStyle;
    DateContainer: PressableStyle;
    DateNumber: TextStyle;
    TodayText: TextStyle;
};

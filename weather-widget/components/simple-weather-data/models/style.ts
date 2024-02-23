import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (simpleWeatherDataProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    Icon: IconStyle;
    TitleContainer: ViewStyle;
    MainTitle: LabelStyle;
    Subtitle: LabelStyle;
};

import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (simpleWeatherDataProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    Icon: IconStyle;
    TitleContainer: ViewStyle;
    MainTitle: TextStyle;
    Subtitle: TextStyle;
};

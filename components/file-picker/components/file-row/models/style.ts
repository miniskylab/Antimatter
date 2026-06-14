import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {ProgressStripesStyle} from "@miniskylab/antimatter-motion-graphics";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (fileRowProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    Icon: IconStyle;
    TitleContainer: ViewStyle;
    MainTitle: TextStyle;
    Subtitle: TextStyle;
    ControlContainer: ViewStyle;
    DeleteButton: ButtonStyle;
    ProgressStripes: ProgressStripesStyle;
};

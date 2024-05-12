import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {MusicPlayerProps} from "./props";

export type MusicPlayerStyle = (musicPlayerProps: WithoutStyle<MusicPlayerProps>) => {
    Root: ViewStyle;
    Icon: IconStyle;
    TitleContainer: ViewStyle;
    MainTitle: TextStyle;
    Subtitle: TextStyle;
    Row: ViewStyle;
    Timer: TextStyle;
    ControlContainer: ViewStyle;
    Button: ButtonStyle;
};

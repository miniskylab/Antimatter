import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {SongRow} from "../components";
import {MusicPlayerProps} from "./props";

export type MusicPlayerStyle = (musicPlayerProps: WithoutStyle<MusicPlayerProps>) => {
    Root: ViewStyle;
    NowPlayingContainer: ViewStyle;
    Icon: IconStyle;
    TitleContainer: ViewStyle;
    MainTitle: TextStyle;
    Subtitle: TextStyle;
    ControlContainer: ViewStyle;
    Timer: TextStyle;
    Button: ButtonStyle;
    SongList: ScrollViewStyle;
    SongRow: SongRow.Style;
};

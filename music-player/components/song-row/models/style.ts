import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {TextStyle} from "@miniskylab/antimatter-text";
import {Props} from "./props";

export type Style = (songRowProps: WithoutStyle<Props>) => {
    Root: PressableStyle;
    SongName: TextStyle;
    SongDuration: TextStyle;
};

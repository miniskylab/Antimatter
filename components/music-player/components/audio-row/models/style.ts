import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {TextStyle} from "@miniskylab/antimatter-text";
import {Props} from "./props";

export type Style = (audioRowProps: WithoutStyle<Props>) => {
    Root: PressableStyle;
    AudioName: TextStyle;
    AudioDuration: TextStyle;
};

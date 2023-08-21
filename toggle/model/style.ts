import {Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ToggleProps} from "./props";

export type ToggleStyle = (toggleProps: Styled<ToggleProps>) => {
    Root?: PressableStyle;
    Icon?: IconStyle;
};

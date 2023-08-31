import {Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {ToggleProps} from "./props";

export type ToggleStyle = (toggleProps: Styled<ToggleProps>) => {
    Root?: ViewStyle;
    Container?: PressableStyle;
    Icon?: IconStyle;
};

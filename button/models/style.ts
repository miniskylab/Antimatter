import {Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ButtonProps} from "./props";

export type ButtonStyle = (buttonProps: Styled<ButtonProps>) => {
    Root?: PressableStyle;
    Icon?: IconStyle;
    Label?: LabelStyle;
};

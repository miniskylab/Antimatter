import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ButtonProps} from "./props";

export type ButtonStyle = (buttonProps: WithoutStyle<ButtonProps>) => {
    Root: PressableStyle;
    Icon: IconStyle;
    Label: TextStyle;
};

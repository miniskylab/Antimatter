import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {TextStyle} from "@miniskylab/antimatter-text";
import {TextInputStyle} from "@miniskylab/antimatter-text-input";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {InputFieldProps} from "./props";

export type InputFieldStyle = (inputFieldProps: WithoutStyle<InputFieldProps>) => {
    Root: PressableStyle;
    AddOn: IconStyle;
    Container: ViewStyle;
    Placeholder: TextStyle;
    TextBox: TextInputStyle;
};

import {Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {TextInputStyle} from "@miniskylab/antimatter-text-input";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {InputFieldProps} from "./props";

export type InputFieldStyle = (inputFieldProps: Styled<InputFieldProps>) => {
    Root?: ViewStyle;
    AddOn?: IconStyle;
    Container?: ViewStyle;
    Placeholder?: LabelStyle;
    TextBox?: TextInputStyle;
};

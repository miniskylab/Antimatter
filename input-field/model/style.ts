import {Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {TextStyle, ViewStyle} from "react-native";
import {InputFieldProps} from "./props";

export type InputFieldStyle = (inputFieldProps: Styled<InputFieldProps>) => {
    Root?: ViewStyle;
    AddOn?: IconStyle;
    Container?: ViewStyle;
    Placeholder?: LabelStyle;
    TextBox?: TextStyle;
};

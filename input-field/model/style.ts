import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ElementStyle, OmitStyle} from "@miniskylab/antimatter-model";
import {TextStyle} from "react-native";
import {InputFieldProps} from "./props";

export type InputFieldStyle = (inputFieldProps: OmitStyle<InputFieldProps>) => {
    Root?: ElementStyle;
    AddOn?: IconStyle;
    Container?: ElementStyle;
    Placeholder?: LabelStyle;
    TextBox?: TextStyle;
};

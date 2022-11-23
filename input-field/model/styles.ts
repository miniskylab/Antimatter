import {IconStyles} from "@miniskylab/antimatter-icon";
import {LabelStyles} from "@miniskylab/antimatter-label";
import {ElementStyle} from "@miniskylab/antimatter-model";
import {TextStyle} from "react-native";

export type InputFieldStyles = {
    Root?: ElementStyle;
    AddOn?: IconStyles;
    Container?: ElementStyle;
    Placeholder?: LabelStyles;
    Placeholder__Shrunk?: LabelStyles;
    TextBox?: TextStyle;
    TextBox__Shrunk?: TextStyle;
};

import {OmitStyle} from "@miniskylab/antimatter-model";
import {TextStyle} from "react-native";
import {LabelProps} from "./props";

export type LabelStyle = (labelProps: OmitStyle<LabelProps>) => {
    Root?: TextStyle
};

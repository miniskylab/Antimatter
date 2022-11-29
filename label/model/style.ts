import {OmitStyle} from "@miniskylab/antimatter-framework";
import {TextStyle} from "react-native";
import {LabelProps} from "./props";

export type LabelStyle = (labelProps: OmitStyle<LabelProps>) => {
    Root?: TextStyle
};

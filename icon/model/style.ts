import {OmitStyle} from "@miniskylab/antimatter-model";
import {TextStyle} from "react-native";
import {IconProps} from "./props";

export type IconStyle = (iconProps: OmitStyle<IconProps>) => {
    Root?: TextStyle
};

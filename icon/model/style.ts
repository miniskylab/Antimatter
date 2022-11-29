import {OmitStyle} from "@miniskylab/antimatter-framework";
import {TextStyle} from "react-native";
import {IconProps} from "./props";

export type IconStyle = (iconProps: OmitStyle<IconProps>) => {
    Root?: TextStyle
};

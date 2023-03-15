import {ButtonStyle} from "@miniskylab/antimatter-button";
import {OmitStyle} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "react-native";
import {Props} from "./props";

export type Style = (controlProps: OmitStyle<Props>) => {
    Root?: ViewStyle;
    Button?: ButtonStyle;
};

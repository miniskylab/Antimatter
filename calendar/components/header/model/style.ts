import {ButtonStyle} from "@miniskylab/antimatter-button";
import {OmitStyle} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "react-native";
import {Props} from "./props";

export type Style = (headerProps: OmitStyle<Props>) => {
    Root?: ViewStyle;
    Headline?: ButtonStyle;
    Navigator?: (position: "left" | "right") => ButtonStyle;
};

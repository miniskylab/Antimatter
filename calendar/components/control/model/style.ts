import {ButtonStyle} from "@miniskylab/antimatter-button";
import {Styled} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "react-native";
import {Props} from "./props";

export type Style = (controlProps: Styled<Props>) => {
    Root?: ViewStyle;
    Button?: ButtonStyle;
};

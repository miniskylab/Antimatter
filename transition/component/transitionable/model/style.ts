import {Styled} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "react-native";
import {Props} from "./props";

export type Style = (transitionableProps: Styled<Props>) => {
    Root?: ViewStyle;
};

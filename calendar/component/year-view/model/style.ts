import {ButtonStyle} from "@miniskylab/antimatter-button";
import {Styled} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "react-native";
import {Props} from "./props";

export type Style = (yearViewProps: Styled<Props>) => {
    Root?: ViewStyle;
    GridCell?: ButtonStyle;
};

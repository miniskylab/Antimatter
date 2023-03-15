import {ButtonStyle} from "@miniskylab/antimatter-button";
import {Styled} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "react-native";
import {Props} from "./props";

export type Style = (monthViewProps: Styled<Props>) => {
    Root?: ViewStyle;
    GridCell?: (month: Date) => ButtonStyle;
};

import {ButtonStyle} from "@miniskylab/antimatter-button";
import {Decade, Styled} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "react-native";
import {Props} from "./props";

export type Style = (yearViewProps: Styled<Props>) => {
    Root?: ViewStyle;
    GridCell?: (year: number, nextDecade: Decade) => ButtonStyle;
};

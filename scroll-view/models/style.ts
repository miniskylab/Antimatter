import {Styled} from "@miniskylab/antimatter-framework";
import * as ReactNative from "react-native";
import {ScrollViewProps} from "./props";

export type ScrollViewStyle = (scrollViewProps: Styled<ScrollViewProps>) => ReactNative.ViewStyle;

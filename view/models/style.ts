import {Styled} from "@miniskylab/antimatter-framework";
import * as ReactNative from "react-native";
import {ViewProps} from "./props";

export type ViewStyle = (viewProps: Styled<ViewProps>) => ReactNative.ViewStyle;

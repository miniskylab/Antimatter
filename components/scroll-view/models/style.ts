import {Animated, WithoutStyle} from "@miniskylab/antimatter-framework";
import * as ReactNative from "react-native";
import {ScrollViewProps} from "./props";

export type ScrollViewStyle = (scrollViewProps: WithoutStyle<ScrollViewProps>) => Animated<ReactNative.ViewStyle>;

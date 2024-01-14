import {Animated, WithoutStyle} from "@miniskylab/antimatter-framework";
import * as ReactNative from "react-native";
import {ViewProps} from "./props";

export type ViewStyle = (viewProps: WithoutStyle<ViewProps>) => Animated<ReactNative.ViewStyle>;

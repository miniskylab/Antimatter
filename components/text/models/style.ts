import {type Animated, type WithoutStyle} from "@miniskylab/antimatter-framework";
import * as ReactNative from "react-native";
import {TextProps} from "./props";

export type TextStyle = (textProps: WithoutStyle<TextProps>) => Animated<ReactNative.TextStyle>;

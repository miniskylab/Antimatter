import {Animated, WithoutStyle} from "@miniskylab/antimatter-framework";
import * as ReactNative from "react-native";
import {ImageProps} from "./props";

export type ImageStyle = (imageProps: WithoutStyle<ImageProps>) => Animated<ReactNative.ImageStyle>;

import {Styled} from "@miniskylab/antimatter-framework";
import * as ReactNative from "react-native";
import {ImageProps} from "./props";

export type ImageStyle = (imageProps: Styled<ImageProps>) => ReactNative.ImageStyle;

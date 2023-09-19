import {Animated, Styled} from "@miniskylab/antimatter-framework";
import {TextStyle} from "react-native";
import {LabelProps} from "./props";

export type LabelStyle = (labelProps: Styled<LabelProps>) => Animated<TextStyle>;

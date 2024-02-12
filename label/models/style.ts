import {Animated, WithoutStyle} from "@miniskylab/antimatter-framework";
import {TextStyle} from "react-native";
import {LabelProps} from "./props";

export type LabelStyle = (labelProps: WithoutStyle<LabelProps>) => Animated<TextStyle>;

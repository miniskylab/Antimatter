import {Dynamic, WithoutStyle} from "@miniskylab/antimatter-framework";
import {TextStyle} from "react-native";
import {IconProps} from "./props";

export type IconStyle = (iconProps: WithoutStyle<IconProps>) => Dynamic<TextStyle>;

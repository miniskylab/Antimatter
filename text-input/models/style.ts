import {Animated, Styled} from "@miniskylab/antimatter-framework";
import {TextStyle} from "react-native";
import {TextInputProps} from "./props";

export type TextInputStyle = (textInputProps: Styled<TextInputProps>) => Animated<TextStyle>;

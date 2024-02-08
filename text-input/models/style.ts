import {Dynamic, WithoutStyle} from "@miniskylab/antimatter-framework";
import {TextStyle} from "react-native";
import {TextInputProps} from "./props";

export type TextInputStyle = (textInputProps: WithoutStyle<TextInputProps>) => Dynamic<TextStyle>;

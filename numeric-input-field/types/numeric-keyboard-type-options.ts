import {KeyboardTypeOptions} from "react-native";

export type NumericKeyboardTypeOptions = Extract<KeyboardTypeOptions, "numeric" | "number-pad" | "decimal-pad" | "numbers-and-punctuation">;

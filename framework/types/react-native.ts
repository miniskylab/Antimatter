import {FocusEvent, GestureResponderEvent, LayoutChangeEvent, TextInputKeyPressEvent, TextInputSelectionChangeEvent} from "react-native";

export type PointerEvents = "none" | "box-none" | "box-only" | "auto";
export type LayoutChangeEventHandler = (event: LayoutChangeEvent) => void;
export type TextInputFocusEventHandler = (event: FocusEvent) => void;
export type TextInputKeyPressEventHandler = (event: TextInputKeyPressEvent) => void;
export type TextInputSelectionChangeEventHandler = (event: TextInputSelectionChangeEvent) => void;
export type ShouldSetResponderPredicate = (event: GestureResponderEvent) => boolean;
export type GestureResponderEventHandler = (event: GestureResponderEvent) => void;

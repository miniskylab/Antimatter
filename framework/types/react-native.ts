import {
    GestureResponderEvent,
    LayoutChangeEvent,
    NativeSyntheticEvent,
    ShadowStyleIOS,
    TextInputFocusEventData,
    TextInputKeyPressEventData,
    TextInputSelectionChangeEventData
} from "react-native";

export type ShadowStyle = () => ShadowStyleIOS;
export type PointerEvents = "none" | "box-none" | "box-only" | "auto";
export type LayoutChangeEventHandler = (event: LayoutChangeEvent) => void;
export type TextInputFocusEventHandler = (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
export type TextInputKeyPressEventHandler = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
export type TextInputSelectionChangeEventHandler = (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
export type ShouldSetResponderPredicate = (event: GestureResponderEvent) => boolean;
export type GestureResponderEventHandler = (event: GestureResponderEvent) => void;

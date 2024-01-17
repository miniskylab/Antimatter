import {
    GestureResponderEvent,
    LayoutChangeEvent,
    NativeSyntheticEvent,
    TextInputFocusEventData,
    TextInputKeyPressEventData,
    TextInputSelectionChangeEventData
} from "react-native";

export type CanBeUndefined<T> = T | undefined;
export type Modify<T, R> = Omit<T, keyof R> & R;
export type Enum = Record<string, number | string>;
export type Animated<T> = T & { animations?: (() => object)[]; };
export type AllPropertiesMustPresent<T> = { [K in keyof Required<T>]: T[K]; };

export type PointerEvents = "none" | "box-none" | "box-only" | "auto";
export type LayoutChangeEventHandler = (event: LayoutChangeEvent) => void;
export type TextInputFocusEventHandler = (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
export type TextInputKeyPressEventHandler = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
export type TextInputSelectionChangeEventHandler = (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
export type ShouldSetResponderPredicate = (event: GestureResponderEvent) => boolean;
export type GestureResponderEventHandler = (event: GestureResponderEvent) => void;

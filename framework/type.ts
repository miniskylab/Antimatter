import {NativeSyntheticEvent, TextInputFocusEventData, TextInputKeyPressEventData, TextInputSelectionChangeEventData} from "react-native";

export type Modify<T, R> = Omit<T, keyof R> & R;

export type TextInputFocusEventHandler = (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
export type TextInputKeyPressEventHandler = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
export type TextInputSelectionChangeEventHandler = (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;

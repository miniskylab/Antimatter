import {StyleSheet} from "react-native";

export type ElementStyle = StyleSheet.NamedStyles<Record<string, unknown>>[string] & {
    cursor?: "none" | "text" | "pointer" | "not-allowed";
};

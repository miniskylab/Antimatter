import {Animated, Styled} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "react-native";
import {PressableProps} from "./props";
import {PressableState} from "./state";

export type PressableStyle = (pressableProps: Styled<PressableProps>, pressableState: PressableState) => Animated<ViewStyle>;

import {Dynamic, WithoutStyle} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "react-native";
import {PressableProps} from "./props";
import {PressableState} from "./state";

export type PressableStyle = (pressableProps: WithoutStyle<PressableProps>, pressableState: PressableState) => Dynamic<ViewStyle>;

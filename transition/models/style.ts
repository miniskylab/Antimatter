import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {TransitionProps} from "./props";
import {TransitionState} from "./state";

export type TransitionStyle = (transitionProps: WithoutStyle<TransitionProps>, transitionState: TransitionState) => ViewStyle;

import {Styled} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {TransitionProps} from "./props";
import {TransitionState} from "./state";

export type TransitionStyle = (transitionProps: Styled<TransitionProps>, transitionState: TransitionState) => ViewStyle;

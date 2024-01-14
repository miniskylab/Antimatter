import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (transitionableProps: WithoutStyle<Props>) => ViewStyle;

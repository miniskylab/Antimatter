import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {TransitionProps} from "./props";
import {type TransitionState} from "./state";

export const TransitionContext = createContext<TransitionContext>(undefined);
export type TransitionContext = ComponentContext<TransitionProps, TransitionState>;

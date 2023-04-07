import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {TransitionProps} from "./props";
import {TransitionState} from "./state";

export const TransitionContext = createContext<TransitionContext>({});
export type TransitionContext = ComponentContext<TransitionProps, TransitionState>;

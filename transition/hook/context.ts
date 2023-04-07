import {useContext} from "react";
import {TransitionContext} from "../model";

export function useTransitionContext(): TransitionContext { return useContext(TransitionContext); }

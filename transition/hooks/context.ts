import {useContext} from "react";
import {TransitionContext} from "../models";

export function useTransitionContext(): TransitionContext { return useContext(TransitionContext); }

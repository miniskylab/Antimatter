import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {TransitionContext} from "../models";

export function useTransitionContext(): NonNullable<TransitionContext> { return useContextOrThrow(TransitionContext); }

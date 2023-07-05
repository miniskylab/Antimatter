import {useContext} from "react";
import {CardContext, CtaTargetContext} from "../model";

export function useCardContext(): CardContext { return useContext(CardContext); }

export function useCtaTargetContext(): CtaTargetContext { return useContext(CtaTargetContext); }

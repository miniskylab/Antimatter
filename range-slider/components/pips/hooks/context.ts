import {useContext} from "react";
import {HighlightedContext, MilestoneContext, PipsContext} from "../models";

export function usePipsContext(): PipsContext { return useContext(PipsContext); }

export function useHighlightedContext(): HighlightedContext { return useContext(HighlightedContext); }

export function useMilestoneContext(): MilestoneContext { return useContext(MilestoneContext); }

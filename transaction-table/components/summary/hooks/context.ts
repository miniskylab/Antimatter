import {useContext} from "react";
import {SectionContext, SummaryContext} from "../models";

export function useSummaryContext(): SummaryContext { return useContext(SummaryContext); }

export function useSectionContext(): SectionContext { return useContext(SectionContext); }

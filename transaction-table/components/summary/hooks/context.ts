import {useContext} from "react";
import {RowContext, SummaryContext} from "../models";

export function useSummaryContext(): SummaryContext { return useContext(SummaryContext); }

export function useRowContext(): RowContext { return useContext(RowContext); }

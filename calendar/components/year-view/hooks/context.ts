import {useContext} from "react";
import {YearContext, YearViewContext} from "../models";

export function useYearViewContext(): YearViewContext { return useContext(YearViewContext); }

export function useYearContext(): YearContext { return useContext(YearContext); }

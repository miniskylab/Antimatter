import {useContext} from "react";
import {MonthContext, MonthViewContext} from "../models";

export function useMonthViewContext(): MonthViewContext { return useContext(MonthViewContext); }

export function useMonthContext(): MonthContext { return useContext(MonthContext); }

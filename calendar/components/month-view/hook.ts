import {useContext} from "react";
import {MonthContext, MonthViewContext} from "./model";

export function useMonthViewContext(): MonthViewContext { return useContext(MonthViewContext); }

export function useMonthContext(): MonthContext { return useContext(MonthContext); }

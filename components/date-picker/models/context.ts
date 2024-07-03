import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {DatePickerProps} from "./props";

export const DatePickerContext = createContext<DatePickerContext>(undefined);
export type DatePickerContext = ComponentContext<DatePickerProps>;

import {useContext} from "react";
import {DatePickerContext} from "../model";

export function useDatePickerContext(): DatePickerContext { return useContext(DatePickerContext); }

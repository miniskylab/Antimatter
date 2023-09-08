import {useContext} from "react";
import {DatePickerContext} from "../models";

export function useDatePickerContext(): DatePickerContext { return useContext(DatePickerContext); }

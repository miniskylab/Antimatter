import {useContext} from "react";
import {NumericInputFieldContext} from "../model";

export function useNumericInputFieldContext(): NumericInputFieldContext { return useContext(NumericInputFieldContext); }

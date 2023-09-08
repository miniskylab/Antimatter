import {useContext} from "react";
import {NumericInputFieldContext} from "../models";

export function useNumericInputFieldContext(): NumericInputFieldContext { return useContext(NumericInputFieldContext); }

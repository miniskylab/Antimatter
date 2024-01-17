import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {NumericInputFieldProps} from "./props";
import {NumericInputFieldState} from "./state";

export const NumericInputFieldContext = createContext<NumericInputFieldContext>(undefined);
export type NumericInputFieldContext = ComponentContext<NumericInputFieldProps, NumericInputFieldState>;

import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {NumericInputFieldProps} from "./props";
import {NumericInputFieldState} from "./state";

export type NumericInputFieldStyle = (
    numericInputFieldProps: WithoutStyle<NumericInputFieldProps>,
    numericInputFieldState: NumericInputFieldState
) => InputFieldStyle;

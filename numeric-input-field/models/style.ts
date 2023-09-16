import {Styled} from "@miniskylab/antimatter-framework";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {NumericInputFieldProps} from "./props";
import {NumericInputFieldState} from "./state";

export type NumericInputFieldStyle = (
    numericInputFieldProps: Styled<NumericInputFieldProps>,
    numericInputFieldState: NumericInputFieldState
) => InputFieldStyle;

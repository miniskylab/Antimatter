import {Styled} from "@miniskylab/antimatter-framework";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {NumericInputFieldProps} from "./props";

export type NumericInputFieldStyle = (numericInputFieldProps: Styled<NumericInputFieldProps>) => {
    Root?: InputFieldStyle;
};

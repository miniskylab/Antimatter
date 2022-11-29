import {OmitStyle} from "@miniskylab/antimatter-framework";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {NumericInputFieldProps} from "./props";

export type NumericInputFieldStyle = (numericInputFieldProps: OmitStyle<NumericInputFieldProps>) => {
    Root?: InputFieldStyle;
};

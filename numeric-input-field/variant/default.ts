import {InputFieldStyle, InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {NumericInputFieldStyle} from "../model";

const NumericInputField__InputField: InputFieldStyle = function (inputFieldProps)
{
    return {
        ...InputFieldVariant.Default(inputFieldProps)
    };
};

export const Default: NumericInputFieldStyle = function ()
{
    return NumericInputField__InputField;
};

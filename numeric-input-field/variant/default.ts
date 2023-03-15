import {InputFieldStyle, InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {NumericInputFieldStyle} from "../model";

export const Default: NumericInputFieldStyle = function ()
{
    const numericInputFieldStyle: ReturnType<NumericInputFieldStyle> = {};

    numericInputFieldStyle.Root = function (inputFieldProps)
    {
        const defaultInputFieldStyle = InputFieldVariant.Default(inputFieldProps);
        const inputFieldStyle: ReturnType<InputFieldStyle> = {...defaultInputFieldStyle};

        return inputFieldStyle;
    };

    return numericInputFieldStyle;
};

import {InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {NumericInputFieldStyle} from "../model";

export const Default: NumericInputFieldStyle = function ()
{
    const numericInputFieldStyle: ReturnType<typeof Default> = {};

    numericInputFieldStyle.Root = function (inputFieldProps)
    {
        const defaultInputFieldStyle = InputFieldVariant.Default(inputFieldProps);
        const inputFieldStyle: ReturnType<typeof numericInputFieldStyle.Root> = {...defaultInputFieldStyle};

        return inputFieldStyle;
    };

    return numericInputFieldStyle;
};

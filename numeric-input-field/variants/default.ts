import {InputFieldContextHook, InputFieldStyle, InputFieldVariant} from "@miniskylab/antimatter-input-field";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {NumericInputFieldStyle} from "../models";

const NumericInputField__InputField__Container: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Container(viewProps);

    return {
        ...inheritedStyle,
        width: "100%"
    };
};

const NumericInputField__InputField: InputFieldStyle = function (inputFieldProps)
{
    return {
        ...InputFieldVariant.Default(inputFieldProps),
        Container: NumericInputField__InputField__Container
    };
};

export const Default: NumericInputFieldStyle = function ()
{
    return NumericInputField__InputField;
};

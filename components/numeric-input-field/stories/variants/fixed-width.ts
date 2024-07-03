import {InputFieldContextHook} from "@miniskylab/antimatter-input-field";
import {type ViewStyle} from "@miniskylab/antimatter-view";
import {NumericInputFieldContextHook} from "../../hooks";
import {type NumericInputFieldStyle} from "../../models";
import * as NumericInputFieldVariant from "../../variants";

const NumericInputField__Root: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();
    const numericInputFieldContext = NumericInputFieldContextHook.useNumericInputFieldContext();

    const inheritedStyle = NumericInputFieldVariant.Default(numericInputFieldContext.props, numericInputFieldContext.state)
        (inputFieldContext.props)
        .Root(viewProps);

    return {
        ...inheritedStyle,
        width: 260
    };
};

export const FixedWidth: NumericInputFieldStyle = function (numericInputFieldProps, numericInputFieldState)
{
    return function (inputFieldProps)
    {
        return {
            ...NumericInputFieldVariant.Default(numericInputFieldProps, numericInputFieldState)(inputFieldProps),
            Root: NumericInputField__Root
        };
    };
};

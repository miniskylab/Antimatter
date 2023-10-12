import {InputFieldContextHook} from "@miniskylab/antimatter-input-field";
import {NumericInputFieldContextHook, NumericInputFieldStyle, NumericInputFieldVariant} from "@miniskylab/antimatter-numeric-input-field";
import {ViewStyle} from "@miniskylab/antimatter-view";

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

import {InputFieldContextHook} from "@miniskylab/antimatter-input-field";
import {type PressableStyle} from "@miniskylab/antimatter-pressable";
import {NumericInputFieldContextHook} from "../../hooks";
import {type NumericInputFieldStyle} from "../../models";
import * as NumericInputFieldVariant from "../../variants";

const NumericInputField__Root: PressableStyle = function (pressableProps, pressableState)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();
    const numericInputFieldContext = NumericInputFieldContextHook.useNumericInputFieldContext();

    const inheritedStyle = NumericInputFieldVariant.Default(numericInputFieldContext.props, numericInputFieldContext.state)
        (inputFieldContext.props)
        .Root(pressableProps, pressableState);

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

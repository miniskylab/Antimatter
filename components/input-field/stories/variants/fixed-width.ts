import {type PressableStyle} from "@miniskylab/antimatter-pressable";
import {InputFieldContextHook} from "../../hooks";
import {type InputFieldStyle} from "../../models";
import * as InputFieldVariant from "../../variants";

const InputField__Root: PressableStyle = function (pressableProps, pressableState)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: 260
    };
};

export const FixedWidth: InputFieldStyle = function (inputFieldProps)
{
    return {
        ...InputFieldVariant.Default(inputFieldProps),
        Root: InputField__Root
    };
};

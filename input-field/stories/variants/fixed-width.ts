import {ViewStyle} from "@miniskylab/antimatter-view";
import {InputFieldContextHook} from "../../hooks";
import {InputFieldStyle} from "../../models";
import * as InputFieldVariant from "../../variants";

const InputField__Root: ViewStyle = function (viewProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    const inheritedStyle = InputFieldVariant.Default(inputFieldContext.props).Root(viewProps);

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

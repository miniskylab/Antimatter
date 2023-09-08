import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {TextInputStyle, TextInputVariant} from "@miniskylab/antimatter-text-input";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {InputFieldAnimationHook, InputFieldContextHook} from "../hooks";
import {InputFieldStyle} from "../models";

const InputField__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        width: "100%",
        height: 40,
        backgroundColor: Color.Mineshaft
    };
};

const InputField__Container: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        height: "100%"
    };
};

const InputField__TextBox: TextInputStyle = function (textInputProps)
{
    const inputFieldContext = InputFieldContextHook.useInputFieldContext();

    return {
        ...TextInputVariant.Default(textInputProps),
        width: "100%",
        height: "100%",
        paddingHorizontal: 12,
        fontSize: 14,
        color: Color.Neutral,
        backgroundColor: Color.Transparent,
        ...InputFieldAnimationHook.useTextBoxAnimation(inputFieldContext.props)
    };
};

const InputField__AddOn: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        width: 40,
        height: "100%",
        fontSize: 20,
        color: Color.Mineshaft,
        backgroundColor: Color.Gray
    };
};

const InputField__Placeholder: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        position: "absolute",
        top: 0,
        alignItems: "flex-start",
        width: "100%",
        paddingLeft: 12,
        color: Color.Gray,
        ...InputFieldAnimationHook.usePlaceholderAnimation()
    };
};

export const Default: InputFieldStyle = function ()
{
    return {
        Root: InputField__Root,
        Container: InputField__Container,
        TextBox: InputField__TextBox,
        AddOn: InputField__AddOn,
        Placeholder: InputField__Placeholder
    };
};

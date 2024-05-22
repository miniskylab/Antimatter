import {Color} from "@miniskylab/antimatter-color-scheme";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type TextInputStyle, TextInputVariant} from "@miniskylab/antimatter-text-input";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {InputFieldAnimationHook} from "../hooks";
import {type InputFieldStyle} from "../models";

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
    return {
        ...TextInputVariant.Default(textInputProps),
        width: "100%",
        height: "100%",
        paddingHorizontal: 12,
        fontSize: 14,
        color: Color.Neutral,
        backgroundColor: Color.Transparent,
        animations: [
            () => InputFieldAnimationHook.useTextBoxAnimation()
        ]
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

const InputField__Placeholder: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        position: "absolute",
        top: 0,
        alignItems: "flex-start",
        width: "100%",
        paddingLeft: 12,
        color: Color.Gray,
        animations: [
            () => InputFieldAnimationHook.usePlaceholderAnimation()
        ]
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

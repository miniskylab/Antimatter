import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {InputFieldAnimationHook} from "../hook";
import {InputFieldStyle} from "../model";

const InputField__AddOn: IconStyle = function (iconProps)
{
    const defaultIconStyle = IconVariant.Default(iconProps);
    const iconStyle: ReturnType<IconStyle> = {...defaultIconStyle};

    iconStyle.Root = {
        ...defaultIconStyle.Root,
        width: 40,
        height: "100%",
        fontSize: 20,
        color: Color.Mineshaft,
        backgroundColor: Color.Gray
    };

    return iconStyle;
};

const InputField__Placeholder: LabelStyle = function (labelProps)
{
    const defaultLabelStyle = LabelVariant.Default(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

    labelStyle.Root = {
        ...defaultLabelStyle.Root,
        position: "absolute",
        alignItems: "flex-start",
        width: "100%",
        paddingLeft: 12,
        color: Color.Gray,
        ...InputFieldAnimationHook.usePlaceholderAnimation()
    };

    return labelStyle;
};

export const Default: InputFieldStyle = function (inputFieldProps)
{
    const inputFieldStyle: ReturnType<InputFieldStyle> = {};

    inputFieldStyle.Root = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 40,
        backgroundColor: Color.Mineshaft
    };

    inputFieldStyle.Container = {
        flexGrow: 1,
        position: "relative"
    };

    inputFieldStyle.TextBox = {
        width: "100%",
        height: "100%",
        paddingHorizontal: 12,
        fontSize: 14,
        color: Color.Neutral,
        backgroundColor: Color.Transparent,
        ...InputFieldAnimationHook.useTextBoxAnimation(inputFieldProps)
    };

    inputFieldStyle.AddOn = InputField__AddOn;
    inputFieldStyle.Placeholder = InputField__Placeholder;

    return inputFieldStyle;
};

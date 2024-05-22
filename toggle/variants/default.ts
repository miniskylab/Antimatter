import {Color} from "@miniskylab/antimatter-color-scheme";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {type PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {ToggleAnimationHook} from "../hooks";
import {type ToggleStyle} from "../models";

const Toggle__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        userSelect: "none"
    };
};

const Toggle__Container: PressableStyle = function (pressableProps, pressableState)
{
    return {
        ...PressableVariant.Default(pressableProps, pressableState),
        width: 80,
        height: 40,
        borderRadius: 20,
        animations: [
            () => ToggleAnimationHook.useContainerAnimation()
        ]
    };
};

const Toggle__Icon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        position: "absolute",
        marginLeft: 6,
        fontSize: 30,
        color: Color.White,
        animations: [
            () => ToggleAnimationHook.useIconAnimation()
        ]
    };
};

export const Default: ToggleStyle = function ()
{
    return {
        Root: Toggle__Root,
        Container: Toggle__Container,
        Icon: Toggle__Icon
    };
};

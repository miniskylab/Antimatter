import {Color} from "@miniskylab/antimatter-color-scheme";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {type PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {Status} from "../enums";
import {ToggleContextHook} from "../hooks";
import {type ToggleStyle} from "../models";

const Toggle__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps)
    };
};

const Toggle__Container: PressableStyle = function (pressableProps, pressableState)
{
    const toggleContext = ToggleContextHook.useToggleContext();

    return {
        ...PressableVariant.Default(pressableProps, pressableState),
        width: 20,
        height: 20,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: Color.Neutral,
        ...pressableState.hovered && {
            borderColor: Color.Primary
        },
        ...(pressableState.pressed || toggleContext.props.status === Status.Checked) && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary
        }
    };
};

const Toggle__Icon: IconStyle = function (iconProps)
{
    const toggleContext = ToggleContextHook.useToggleContext();

    return {
        ...IconVariant.Default(iconProps),
        display: toggleContext.props.status === Status.Unchecked ? "none" : "flex",
        fontSize: 14,
        color: Color.Ambient
    };
};

export const Checkbox: ToggleStyle = function ()
{
    return {
        Root: Toggle__Root,
        Container: Toggle__Container,
        Icon: Toggle__Icon
    };
};

import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {PressableContextHook, PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {ButtonStyle} from "../model";

const Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    return {
        ...PressableVariant.Default(pressableProps, pressableState),
        width: 34,
        height: 34,
        borderRadius: 34 / 2,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Primary,
        cursor: "pointer",
        backgroundColor: pressableState.pressed
            ? Color.Primary
            : pressableState.hovered
                ? Color.Primary__a10
                : Color.Transparent,
        ...pressableProps.disabled && {
            opacity: .2,
            cursor: "not-allowed"
        }
    };
};

const Button__Icon: IconStyle = function (iconProps)
{
    const pressableContext = PressableContextHook.usePressableContext();

    return {
        ...IconVariant.Default(iconProps),
        fontSize: 14,
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : Color.Primary
    };
};

const Button__Label: LabelStyle = function ()
{
    return {
        display: "none"
    };
};

export const OutlinedCircular: ButtonStyle = function ()
{
    return {
        Root: Button__Root,
        Icon: Button__Icon,
        Label: Button__Label
    };
};

import {Color} from "@miniskylab/antimatter-color-scheme";
import {CursorType} from "@miniskylab/antimatter-framework";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {PressableContextHook, PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ButtonStyle} from "../models";

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
        cursor: CursorType.Pointer,
        backgroundColor: pressableState.pressed
            ? Color.Primary
            : pressableState.hovered
                ? Color.Primary__a10
                : Color.Transparent,
        ...pressableProps.disabled && {
            opacity: .2,
            cursor: CursorType.NotAllowed,
            borderColor: Color.Neutral
        }
    };
};

const Button__Icon: IconStyle = function (iconProps)
{
    const pressableContext = PressableContextHook.usePressableContext();

    return {
        ...IconVariant.Default(iconProps),
        fontSize: 14,
        color: pressableContext.props.disabled
            ? Color.Neutral
            : pressableContext.state.pressed
                ? Color.Ambient
                : pressableContext.state.hovered
                    ? Color.White
                    : Color.Primary
    };
};

const Button__Label: TextStyle = function ()
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

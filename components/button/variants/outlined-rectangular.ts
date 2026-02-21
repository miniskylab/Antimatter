import {Color} from "@miniskylab/antimatter-color-scheme";
import {CursorType} from "@miniskylab/antimatter-framework";
import {type IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {PressableContextHook, type PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ButtonStyle} from "../models";

const Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    return {
        ...PressableVariant.Default(pressableProps, pressableState),
        flexDirection: "row",
        alignSelf: "center",
        minWidth: 120,
        height: 34,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 0,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: Color.Blue,
        cursor: CursorType.Pointer,
        backgroundColor: pressableState.pressed
            ? Color.Blue
            : pressableState.hovered
                ? Color.Blue__a10
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
        minWidth: 16,
        height: 16,
        fontSize: 16,
        color: pressableContext.props.disabled
            ? Color.Neutral
            : pressableContext.state.pressed
                ? Color.Ambient
                : pressableContext.state.hovered
                    ? Color.White
                    : Color.Blue
    };
};

const Button__Label: TextStyle = function (textProps)
{
    const pressableContext = PressableContextHook.usePressableContext();

    return {
        ...TextVariant.Default(textProps),
        fontSize: 14,
        paddingVertical: 0,
        paddingHorizontal: 10,
        color: pressableContext.props.disabled
            ? Color.Neutral
            : pressableContext.state.pressed
                ? Color.Ambient
                : pressableContext.state.hovered
                    ? Color.White
                    : Color.Blue
    };
};

export const OutlinedRectangular: ButtonStyle = function ()
{
    return {
        Root: Button__Root,
        Icon: Button__Icon,
        Label: Button__Label
    };
};

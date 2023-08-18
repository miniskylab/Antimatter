import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {PressableContextHook, PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {ButtonStyle} from "../model";

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
        borderColor: Color.Primary,
        cursor: "pointer",
        backgroundColor: pressableState.pressed
            ? Color.Primary
            : pressableState.hovered
                ? Color.Primary__a10
                : Color.Transparent,
        ...pressableProps.disabled && {
            opacity: .2,
            cursor: "not-allowed",
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
                    : Color.Primary
    };
};

const Button__Label: LabelStyle = function (labelProps)
{
    const pressableContext = PressableContextHook.usePressableContext();

    return {
        ...LabelVariant.Default(labelProps),
        fontSize: 14,
        paddingVertical: 0,
        paddingHorizontal: 10,
        color: pressableContext.props.disabled
            ? Color.Neutral
            : pressableContext.state.pressed
                ? Color.Ambient
                : pressableContext.state.hovered
                    ? Color.White
                    : Color.Primary
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

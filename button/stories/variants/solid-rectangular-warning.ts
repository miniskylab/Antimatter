import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {PressableContextHook, PressableStyle} from "@miniskylab/antimatter-pressable";
import {useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";
import {ButtonContextHook} from "../../hooks";
import {ButtonStyle} from "../../models";
import * as ButtonVariant from "../../variants";

const Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flexDirection: "row-reverse",
        ...pressableState.pressed
            ? {
                borderColor: Color.Warning__b10,
                backgroundColor: Color.Warning__b10
            }
            : pressableState.hovered
                ? {
                    borderColor: Color.Warning__w25,
                    backgroundColor: Color.Warning__w25
                }
                : {
                    borderColor: Color.Warning,
                    backgroundColor: Color.Warning
                }
    };
};

const Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const iconTranslateX = useRef(new Animated.Value(0)).current;

    useEffect(() =>
    {
        Animated.timing(iconTranslateX, {
            toValue: pressableContext.state.hovered ? 5 : 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
    }, [pressableContext.state.hovered]);

    const inheritedStyle = ButtonVariant.SolidRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        fontSize: 13,
        transform: [{
            translateX: iconTranslateX as unknown as number
        }]
    };
};

export const SolidRectangularWarning: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.SolidRectangular(buttonProps),
        Root: Button__Root,
        Icon: Button__Icon
    };
};

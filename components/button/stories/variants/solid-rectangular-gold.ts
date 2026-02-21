import {Color} from "@miniskylab/antimatter-color-scheme";
import {type IconStyle} from "@miniskylab/antimatter-icon";
import {PressableContextHook, type PressableStyle} from "@miniskylab/antimatter-pressable";
import {useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";
import {ButtonContextHook} from "../../hooks";
import {type ButtonStyle} from "../../models";
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
                borderColor: Color.Gold__b10,
                backgroundColor: Color.Gold__b10
            }
            : pressableState.hovered
                ? {
                    borderColor: Color.Gold__w25,
                    backgroundColor: Color.Gold__w25
                }
                : {
                    borderColor: Color.Gold,
                    backgroundColor: Color.Gold
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

export const SolidRectangularGold: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.SolidRectangular(buttonProps),
        Root: Button__Root,
        Icon: Button__Icon
    };
};

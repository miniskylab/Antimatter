import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {useEffect, useRef} from "react";
import {Animated, ColorValue, Easing} from "react-native";
import {Status} from "../enum";
import {ToggleContextHook} from "../hook";
import {ToggleStyle} from "../model";

const Toggle__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        userSelect: "none"
    };
};

const Toggle__Container: PressableStyle = function (pressableProps, pressableState)
{
    const toggleContext = ToggleContextHook.useToggleContext();

    const initialBackgroundColor = toggleContext.props.status === Status.Unchecked ? 0 : 1;
    const animatedBackgroundColor = useRef(new Animated.Value(initialBackgroundColor)).current;
    const interpolatedBackgroundColor = animatedBackgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: [Color.Background, Color.Primary__b10]
    });

    useEffect(() =>
    {
        Animated.timing(animatedBackgroundColor, {
            toValue: toggleContext.props.status === Status.Unchecked ? 0 : 1,
            easing: Easing.inOut(Easing.ease),
            duration: 150,
            useNativeDriver: false
        }).start();
    }, [toggleContext.props.status]);

    return {
        ...PressableVariant.Default(pressableProps, pressableState),
        width: 80,
        height: 40,
        borderRadius: 20,
        backgroundColor: interpolatedBackgroundColor as unknown as ColorValue
    };
};

const Toggle__Icon: IconStyle = function (iconProps)
{
    const toggleContext = ToggleContextHook.useToggleContext();

    const initialIconPosition = toggleContext.props.status === Status.Unchecked ? 0 : 39;
    const animatedIconPosition = useRef(new Animated.Value(initialIconPosition)).current;

    useEffect(() =>
    {
        Animated.timing(animatedIconPosition, {
            toValue: toggleContext.props.status === Status.Unchecked ? 0 : 39,
            easing: Easing.inOut(Easing.ease),
            duration: 150,
            useNativeDriver: false
        }).start();
    }, [toggleContext.props.status]);

    return {
        ...IconVariant.Default(iconProps),
        position: "absolute",
        marginLeft: 6,
        fontSize: 30,
        color: Color.White,
        left: animatedIconPosition as unknown as number
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

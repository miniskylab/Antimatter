import {Color} from "@miniskylab/antimatter-color-scheme";
import {type ComponentAnimation} from "@miniskylab/antimatter-framework";
import {useEffect, useRef} from "react";
import {Animated, type ColorValue, Easing} from "react-native";
import {Status} from "../enums";
import {useToggleContext} from "./context";

export function useContainerAnimation(): ComponentAnimation
{
    const toggleContext = useToggleContext();

    const initialBackgroundColor = toggleContext.props.status === Status.Unchecked ? 0 : 1;
    const animatedBackgroundColor = useRef(new Animated.Value(initialBackgroundColor)).current;
    const interpolatedBackgroundColor = animatedBackgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: [Color.Background, Color.Blue__b10]
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
        animatedStyle: {
            backgroundColor: interpolatedBackgroundColor as unknown as ColorValue
        }
    };
}

export function useIconAnimation(): ComponentAnimation
{
    const toggleContext = useToggleContext();

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
        animatedStyle: {
            left: animatedIconPosition as unknown as number
        }
    };
}

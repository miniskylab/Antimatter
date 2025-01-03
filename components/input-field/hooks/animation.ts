import {type ComponentAnimation} from "@miniskylab/antimatter-framework";
import {useEffect, useRef} from "react";
import {Animated, type DimensionValue, Easing} from "react-native";
import {useInputFieldContext} from "./context";

export function usePlaceholderAnimation(normalFontSize: number, shrunkenFontSize: number): ComponentAnimation
{
    const inputFieldContext = useInputFieldContext();

    const initialFontSize = inputFieldContext.props.placeholder && inputFieldContext.props.value ? shrunkenFontSize : normalFontSize;
    const initialHeight = inputFieldContext.props.placeholder && inputFieldContext.props.value ? 55 : 100;
    const animatedFontSize = useRef(new Animated.Value(initialFontSize)).current;
    const animatedHeight = useRef(new Animated.Value(initialHeight)).current;
    const interpolatedHeight = animatedHeight.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"]
    });

    useEffect(() =>
    {
        if (inputFieldContext.props.placeholder)
        {
            Animated.parallel([
                Animated.timing(animatedHeight, {
                    toValue: inputFieldContext.props.value ? 55 : 100,
                    duration: 100,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                }),
                Animated.timing(animatedFontSize, {
                    toValue: inputFieldContext.props.value ? shrunkenFontSize : normalFontSize,
                    duration: 100,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                })
            ]).start();
        }
    }, [inputFieldContext.props.value]);

    return {
        animatedStyle: {
            height: interpolatedHeight as unknown as DimensionValue,
            fontSize: animatedFontSize as unknown as number
        }
    };
}

export function useTextBoxAnimation(): ComponentAnimation
{
    const inputFieldContext = useInputFieldContext();

    const initialPaddingTop = inputFieldContext.props.placeholder && inputFieldContext.props.value ? 19 : 0;
    const initialPaddingBottom = inputFieldContext.props.placeholder && inputFieldContext.props.value ? 3 : 0;
    const animatedPaddingTop = useRef(new Animated.Value(initialPaddingTop)).current;
    const animatedPaddingBottom = useRef(new Animated.Value(initialPaddingBottom)).current;

    useEffect(() =>
    {
        if (inputFieldContext.props.placeholder)
        {
            Animated.parallel([
                Animated.timing(animatedPaddingTop, {
                    toValue: inputFieldContext.props.value ? 19 : 0,
                    duration: 100,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                }),
                Animated.timing(animatedPaddingBottom, {
                    toValue: inputFieldContext.props.value ? 3 : 0,
                    duration: 100,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                })
            ]).start();
        }
    }, [inputFieldContext.props.value]);

    return {
        animatedStyle: {
            paddingTop: animatedPaddingTop as unknown as number,
            paddingBottom: animatedPaddingBottom as unknown as number
        }
    };
}

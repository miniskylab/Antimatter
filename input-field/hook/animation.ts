import {Styled} from "@miniskylab/antimatter-framework";
import {useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";
import {InputFieldProps} from "../model";
import {useInputFieldContext} from "./context";

export function usePlaceholderAnimation()
{
    const inputFieldContext = useInputFieldContext();

    const animatedFontSize = useRef(new Animated.Value(16)).current;
    const animatedHeight = useRef(new Animated.Value(100)).current;
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
                    toValue: inputFieldContext.props.value ? 11 : 16,
                    duration: 100,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                })
            ]).start();
        }
    }, [inputFieldContext.props.value]);

    return {
        height: interpolatedHeight as unknown as string,
        fontSize: animatedFontSize as unknown as number
    };
}

export function useTextBoxAnimation(inputFieldProps: Styled<InputFieldProps>)
{
    const animatedPaddingTop = useRef(new Animated.Value(6)).current;
    const animatedPaddingBottom = useRef(new Animated.Value(6)).current;

    useEffect(() =>
    {
        if (inputFieldProps.placeholder)
        {
            Animated.parallel([
                Animated.timing(animatedPaddingTop, {
                    toValue: inputFieldProps.value ? 20 : 6,
                    duration: 100,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                }),

                Animated.timing(animatedPaddingBottom, {
                    toValue: inputFieldProps.value ? 5 : 6,
                    duration: 100,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                })
            ]).start();
        }
    }, [inputFieldProps.value]);

    return {
        paddingTop: animatedPaddingTop as unknown as number,
        paddingBottom: animatedPaddingBottom as unknown as number
    };
}

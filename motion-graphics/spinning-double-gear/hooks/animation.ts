import {ComponentAnimation} from "@miniskylab/antimatter-framework";
import {useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";

type DoubleGearAnimation = {
    clockwiseRotation: ComponentAnimation;
    antiClockwiseRotation: ComponentAnimation;
};

export function useDoubleGearAnimation(msAnimationDuration: number | undefined): DoubleGearAnimation
{
    const initialRotation = 0;
    const animatedRotation = useRef(new Animated.Value(initialRotation)).current;
    const interpolatedClockwiseRotation = animatedRotation.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "360deg"]
    });
    const interpolatedAntiClockwiseRotation = animatedRotation.interpolate({
        inputRange: [0, 360],
        outputRange: ["-0deg", "-360deg"]
    });

    useEffect(() =>
    {
        Animated.loop(
            Animated.timing(animatedRotation, {
                toValue: 360,
                duration: msAnimationDuration,
                easing: Easing.linear,
                useNativeDriver: false
            })
        ).start();
    }, [msAnimationDuration]);

    return {
        clockwiseRotation: {animatedStyle: {transform: [{rotate: interpolatedClockwiseRotation}]}},
        antiClockwiseRotation: {animatedStyle: {transform: [{rotate: interpolatedAntiClockwiseRotation}]}}
    };
}

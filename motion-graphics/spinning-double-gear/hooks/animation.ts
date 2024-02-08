import {useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";

export function useDoubleGearAnimation(msAnimationDuration: number | undefined)
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
        clockwiseRotation: {transform: [{rotate: interpolatedClockwiseRotation}]},
        antiClockwiseRotation: {transform: [{rotate: interpolatedAntiClockwiseRotation}]}
    };
}

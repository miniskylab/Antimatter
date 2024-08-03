import {type ComponentAnimation} from "@miniskylab/antimatter-framework";
import {useEffect, useLayoutEffect, useRef} from "react";
import {Animated, Easing} from "react-native";
import {useDataListContext} from "./context";

export function useDisplayIconAnimation(isAnimationPlaying?: boolean): ComponentAnimation
{
    const initialRotation = 0;
    const animatedRotation = useRef(new Animated.Value(initialRotation)).current;
    const interpolatedRotation = animatedRotation.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "360deg"]
    });

    useLayoutEffect(() =>
    {
        if (isAnimationPlaying)
        {
            Animated.loop(
                Animated.timing(animatedRotation, {
                    toValue: 360,
                    duration: 2800,
                    easing: Easing.linear,
                    useNativeDriver: false
                })
            ).start();
        }
        else
        {
            animatedRotation.setValue(0);
        }
    }, [isAnimationPlaying]);

    return {
        animatedStyle: {
            transform: [{rotate: interpolatedRotation}]
        }
    };
}

export function useDisplayPanelFadeOutAnimation(): ComponentAnimation
{
    const dataListContext = useDataListContext();

    const initialOpacity = dataListContext.props.displayPanel?.isVisible ? 1 : 0;
    const animatedOpacity = useRef(new Animated.Value(initialOpacity)).current;

    useEffect(() =>
    {
        Animated.timing(animatedOpacity, {
            toValue: dataListContext.props.displayPanel?.isVisible ? 1 : 0,
            duration: dataListContext.props.displayPanel?.isVisible ? 0 : 200,
            delay: dataListContext.props.displayPanel?.isVisible ? 0 : 1800,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
    }, [!!dataListContext.props.displayPanel?.isVisible]);

    return {
        animatedStyle: {
            opacity: animatedOpacity
        }
    };
}

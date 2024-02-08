import {useEffect, useRef} from "react";
import ReactNative, {Animated, Easing} from "react-native";
import {useProgressStripesContext} from "./context";

export function useStripeAnimation(): ReactNative.ViewStyle
{
    const initialTranslateX = 0;
    const animatedTranslateX = useRef(new Animated.Value(initialTranslateX)).current;
    const progressStripesContext = useProgressStripesContext();

    useEffect(() =>
    {
        Animated.loop(
            Animated.timing(animatedTranslateX, {
                toValue: 2 * progressStripesContext.state.stripeWidth,
                duration: progressStripesContext.props.msAnimationDuration,
                easing: Easing.linear,
                useNativeDriver: false
            })
        ).start();
    }, [progressStripesContext.state.stripeWidth, progressStripesContext.props.msAnimationDuration]);

    return {
        transform: [
            {skewX: "-45deg"},
            {translateX: animatedTranslateX}
        ]
    };
}

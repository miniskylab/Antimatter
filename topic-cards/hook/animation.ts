import {PressableContextHook} from "@miniskylab/antimatter-pressable";
import {useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";
import {Card} from "../component";

export function useCtaIconHoverAnimation()
{
    const ctaTargetContext = Card.ContextHook.useCtaTargetContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const iconScale = useRef(new Animated.Value(1)).current;
    const iconTranslateX = useRef(new Animated.Value(0)).current;

    useEffect(() =>
    {
        switch (ctaTargetContext)
        {
            case Card.CtaTarget.NewWindowOrTab:
            {
                Animated.timing(iconScale, {
                    toValue: pressableContext.state.hovered ? 1.4 : 1,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: false
                }).start();
                break;
            }

            case Card.CtaTarget.SameWindowOrTab:
            {
                Animated.timing(iconTranslateX, {
                    toValue: pressableContext.state.hovered ? 8 : 0,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: false
                }).start();
                break;
            }
        }
    }, [pressableContext.state.hovered]);

    return {
        transform: [
            {scale: iconScale as unknown as number},
            {translateX: iconTranslateX as unknown as number}
        ]
    };
}

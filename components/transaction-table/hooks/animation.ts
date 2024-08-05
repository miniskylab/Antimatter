import {Color} from "@miniskylab/antimatter-color-scheme";
import {type ComponentAnimation, Layer} from "@miniskylab/antimatter-framework";
import {useEffect, useRef} from "react";
import {Animated, type ColorValue, Easing} from "react-native";

export function useFlashHighlightAnimation(): ComponentAnimation
{
    const initialColor = 0;
    const initialLayer = Layer.Default;
    const animatedColor = useRef(new Animated.Value(initialColor)).current;
    const animatedLayer = useRef(new Animated.Value(initialLayer)).current;
    const interpolatedBorderColor = animatedColor.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [Color.Neutral, Color.Positive, Color.Neutral]
    });
    const interpolatedBackgroundColor = animatedColor.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [Color.Transparent, Color.Positive__b10, Color.Transparent]
    });

    return {
        animatedStyle: {
            borderColor: interpolatedBorderColor as unknown as ColorValue,
            backgroundColor: interpolatedBackgroundColor as unknown as ColorValue,
            zIndex: animatedLayer as unknown as number
        },
        imperativeAnimationHandles: {
            flashHighlight()
            {
                const msFadeOutDuration = 2500;
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(animatedColor, {
                            toValue: 1,
                            duration: 0,
                            useNativeDriver: false
                        }),
                        Animated.timing(animatedColor, {
                            toValue: 2,
                            duration: msFadeOutDuration,
                            easing: Easing.in(Easing.ease),
                            useNativeDriver: false
                        })
                    ]),
                    Animated.sequence([
                        Animated.timing(animatedLayer, {
                            toValue: Layer.Higher,
                            duration: 0,
                            useNativeDriver: false
                        }),
                        Animated.timing(animatedLayer, {
                            toValue: Layer.Default,
                            duration: 0,
                            delay: msFadeOutDuration,
                            useNativeDriver: false
                        })
                    ])
                ]).start();
            }
        }
    };
}

export function useVerticalContractionAnimation(initialHeight: number, targetHeight: number): ComponentAnimation
{
    const initialColor = 0;
    const animatedColor = useRef(new Animated.Value(initialColor)).current;
    const animatedHeight = useRef(new Animated.Value(initialHeight)).current;
    const interpolatedBackgroundColor = animatedColor.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [Color.Transparent, Color.Negative, Color.Transparent]
    });

    const ref = useRef({animationHasStarted: false});
    useEffect(() => () =>
    {
        animatedColor.setValue(2);
        animatedHeight.setValue(0);
    }, []);

    return {
        animatedStyle: {
            height: animatedHeight,
            backgroundColor: interpolatedBackgroundColor as unknown as ColorValue
        },
        imperativeAnimationHandles: {
            verticalContract(onAnimationEnd: () => void)
            {
                if (ref.current.animationHasStarted)
                {
                    return;
                }

                const msDuration = 2000;
                ref.current.animationHasStarted = true;
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(animatedColor, {
                            toValue: 1,
                            duration: 0,
                            useNativeDriver: false
                        }),
                        Animated.timing(animatedColor, {
                            toValue: 2,
                            duration: msDuration,
                            easing: Easing.in(Easing.circle),
                            useNativeDriver: false
                        })
                    ]),
                    Animated.timing(animatedHeight, {
                        toValue: targetHeight,
                        duration: msDuration,
                        easing: Easing.out(Easing.circle),
                        useNativeDriver: false
                    })
                ]).start(onAnimationEnd);
            }
        }
    };
}

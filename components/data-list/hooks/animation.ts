import {Color} from "@miniskylab/antimatter-color-scheme";
import {type ComponentAnimation, Layer} from "@miniskylab/antimatter-framework";
import {useEffect, useLayoutEffect, useRef} from "react";
import {Animated, type ColorValue, Easing} from "react-native";
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

export function useElasticHeightAnimation(
    pxInitialHeight: number,
    pxMinHeight: number,
    pxEditModeHeight: number,
    pxAlarmModeHeight: number,
    msEditModeExpandHeightAnimationDuration: number = 200,
    msAlarmModeExpandHeightAnimationDuration: number = 200,
    msContractHeightAnimationDuration: number = 200,
    msCollapseHeightAnimationDuration: number = 2000,
    msEditModeExpandHeightAnimationDelay: number = 0,
    msAlarmModeExpandHeightAnimationDelay: number = 0,
    msContractHeightAnimationDelay: number = 0,
    msCollapseHeightAnimationDelay: number = 0
): ComponentAnimation
{
    const initialColor = 0;
    const animatedColor = useRef(new Animated.Value(initialColor)).current;
    const animatedHeight = useRef(new Animated.Value(pxInitialHeight)).current;
    const interpolatedBackgroundColor = animatedColor.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [Color.Transparent, Color.Negative, Color.Transparent]
    });

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
            editModeExpandHeight(onAnimationEnd?: () => void)
            {
                Animated.timing(animatedHeight, {
                    toValue: pxEditModeHeight,
                    delay: msEditModeExpandHeightAnimationDelay,
                    duration: msEditModeExpandHeightAnimationDuration,
                    easing: Easing.linear,
                    useNativeDriver: false
                }).start(onAnimationEnd);
            },

            alarmModeExpandHeight(onAnimationEnd?: () => void)
            {
                Animated.timing(animatedHeight, {
                    toValue: pxAlarmModeHeight,
                    delay: msAlarmModeExpandHeightAnimationDelay,
                    duration: msAlarmModeExpandHeightAnimationDuration,
                    easing: Easing.linear,
                    useNativeDriver: false
                }).start(onAnimationEnd);
            },

            contractHeight(onAnimationEnd?: () => void)
            {
                Animated.timing(animatedHeight, {
                    toValue: pxInitialHeight,
                    delay: msContractHeightAnimationDelay,
                    duration: msContractHeightAnimationDuration,
                    easing: Easing.linear,
                    useNativeDriver: false
                }).start(onAnimationEnd);
            },

            collapseHeight(onAnimationEnd: () => void)
            {
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(animatedColor, {
                            toValue: 1,
                            duration: 0,
                            useNativeDriver: false
                        }),
                        Animated.timing(animatedColor, {
                            toValue: 2,
                            delay: msCollapseHeightAnimationDelay,
                            duration: msCollapseHeightAnimationDuration,
                            easing: Easing.in(Easing.circle),
                            useNativeDriver: false
                        })
                    ]),
                    Animated.timing(animatedHeight, {
                        toValue: pxMinHeight,
                        delay: msCollapseHeightAnimationDelay,
                        duration: msCollapseHeightAnimationDuration,
                        easing: Easing.out(Easing.circle),
                        useNativeDriver: false
                    })
                ]).start(onAnimationEnd);
            }
        }
    };
}

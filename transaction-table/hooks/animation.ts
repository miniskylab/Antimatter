import {Color} from "@miniskylab/antimatter-color-scheme";
import {Layer} from "@miniskylab/antimatter-framework";
import {useEffect, useImperativeHandle, useLayoutEffect, useRef} from "react";
import ReactNative, {Animated, ColorValue, Easing} from "react-native";
import {TransactionRecord} from "../components";
import {useTransactionTableContext} from "./context";

export function useDisplayIconAnimation(isAnimationPlaying?: boolean): ReactNative.ViewStyle
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
        transform: [{rotate: interpolatedRotation}]
    };
}

export function useFlashHighlightAnimation(): ReactNative.ViewStyle
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

    const transactionRecordContext = TransactionRecord.ContextHook.useTransactionRecordContext();
    useImperativeHandle(transactionRecordContext.ref, () => ({
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
    }), []);

    return {
        borderColor: interpolatedBorderColor as unknown as ColorValue,
        backgroundColor: interpolatedBackgroundColor as unknown as ColorValue,
        zIndex: animatedLayer as unknown as number
    };
}

export function useDisplayPanelFadeOutAnimation(): ReactNative.ViewStyle
{
    const transactionTableContext = useTransactionTableContext();

    const initialOpacity = transactionTableContext.props.displayPanel?.isVisible ? 1 : 0;
    const animatedOpacity = useRef(new Animated.Value(initialOpacity)).current;

    useEffect(() =>
    {
        Animated.timing(animatedOpacity, {
            toValue: transactionTableContext.props.displayPanel?.isVisible ? 1 : 0,
            duration: transactionTableContext.props.displayPanel?.isVisible ? 0 : 200,
            delay: transactionTableContext.props.displayPanel?.isVisible ? 0 : 1800,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
    }, [!!transactionTableContext.props.displayPanel?.isVisible]);

    return {
        opacity: animatedOpacity
    };
}

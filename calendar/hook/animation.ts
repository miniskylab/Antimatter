import {useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";
import {getViewId, getViewPosition} from "../service";
import {useCalendarContext} from "./context";

export function useViewTransitionAnimation(viewId: string, viewWitdh: number, onFinished: (endResult: Animated.EndResult) => void)
{
    const calendarContext = useCalendarContext();

    const isActiveView = viewId === getViewId(calendarContext.state.activeView);
    const translateXRef = useRef(getViewPosition(calendarContext, viewId, viewWitdh, true));
    const animatedTranslateX = useRef(new Animated.Value(translateXRef.current)).current;
    const animatedOpacity = useRef(new Animated.Value(isActiveView ? 1 : 0)).current;

    useEffect(() =>
    {
        const transitionInProgress = Object.entries(calendarContext.state.transitioningOutViews).length > 0;
        if (transitionInProgress)
        {
            animatedTranslateX.setValue(translateXRef.current);

            const nextTranslateX = getViewPosition(calendarContext, viewId, viewWitdh, false);
            if (nextTranslateX !== translateXRef.current)
            {
                translateXRef.current = nextTranslateX;

                Animated.parallel([
                    Animated.timing(animatedTranslateX, {
                        toValue: nextTranslateX,
                        duration: 300,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: false
                    }),
                    Animated.timing(animatedOpacity, {
                        toValue: isActiveView ? 1 : 0,
                        duration: 300,
                        easing: Easing.in(Easing.ease),
                        useNativeDriver: false
                    })
                ]).start(onFinished);
            }
        }
    }, [calendarContext.state.activeView]);

    return {
        opacity: animatedOpacity as unknown as number,
        transform: [{
            translateX: animatedTranslateX as unknown as number
        }]
    };
}

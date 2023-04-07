import {useLayoutEffect, useRef} from "react";
import {Animated, Easing, ViewStyle} from "react-native";
import {Animation, SlideDirection, Stage, ZoomDirection} from "../enum";
import {useTransitionContext} from "./context";

type AnimationFinishedCallback = (endResult: Animated.EndResult) => void;
export function useAnimation(transitionStage: Stage, onFinished: AnimationFinishedCallback)
{
    const transitionContext = useTransitionContext();

    const transitionInProgress = Object.entries(transitionContext.state.children).length > 1;

    const translateXRef = useRef(getPosition(Stage.Mount));
    const opacityRef = useRef(getOpacity(Stage.Mount));
    const scaleRef = useRef(getScale(Stage.Mount));
    const animatedTranslateX = useRef(new Animated.Value(translateXRef.current)).current;
    const animatedOpacity = useRef(new Animated.Value(opacityRef.current)).current;
    const animatedScale = useRef(new Animated.Value(scaleRef.current)).current;

    useLayoutEffect(() =>
    {
        if (!transitionInProgress)
        {
            return;
        }

        switch (transitionContext.props.settings.animation)
        {
            case Animation.Slide:
            {
                doSlideAnimation();
                return;
            }

            case Animation.Zoom:
            {
                doZoomAnimation();
                return;
            }

            case Animation.None:
            default:
            {
                onFinished({finished: true});
                return;
            }
        }
    }, [transitionContext.props.children]);

    return getAnimation();

    function getPosition(transitionStage: Stage): number
    {
        if (transitionContext.props.settings.animation === Animation.Slide)
        {
            if (transitionStage === Stage.Mount)
            {
                switch (transitionContext.props.settings.slideDirection)
                {
                    case SlideDirection.Right:
                        return transitionContext.props.settings.pxSlideDistance;

                    case SlideDirection.Left:
                        return -transitionContext.props.settings.pxSlideDistance;
                }
            }
            else if (transitionStage === Stage.Exit)
            {
                switch (transitionContext.props.settings.slideDirection)
                {
                    case SlideDirection.Right:
                        return -transitionContext.props.settings.pxSlideDistance;

                    case SlideDirection.Left:
                        return transitionContext.props.settings.pxSlideDistance;
                }
            }
        }

        return 0;
    }

    function getOpacity(transitionStage: Stage): number
    {
        if (
            (transitionStage === Stage.Mount && transitionInProgress && transitionContext.props.settings.animation !== Animation.None)
            ||
            transitionStage === Stage.Exit
        )
        {
            return 0;
        }

        return 1;
    }

    function getScale(transitionStage: Stage): number
    {
        if (transitionContext.props.settings.animation === Animation.Zoom)
        {
            if (transitionStage === Stage.Mount)
            {
                switch (transitionContext.props.settings.zoomDirection)
                {
                    case ZoomDirection.Inward:
                        return 0.7;

                    case ZoomDirection.Outward:
                        return 2;
                }
            }
            else if (transitionStage === Stage.Exit)
            {
                switch (transitionContext.props.settings.zoomDirection)
                {
                    case ZoomDirection.Inward:
                        return 1.3;

                    case ZoomDirection.Outward:
                        return 0.7;
                }
            }
        }

        return 1;
    }

    function doSlideAnimation(): void
    {
        animatedTranslateX.setValue(translateXRef.current);
        animatedOpacity.setValue(opacityRef.current);

        const nextTranslateX = getPosition(transitionStage);
        const nextOpacity = getOpacity(transitionStage);
        if (nextTranslateX !== translateXRef.current && nextOpacity !== opacityRef.current)
        {
            translateXRef.current = nextTranslateX;
            opacityRef.current = nextOpacity;

            Animated.parallel([
                Animated.timing(animatedTranslateX, {
                    toValue: nextTranslateX,
                    duration: 300,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                }),
                Animated.timing(animatedOpacity, {
                    toValue: nextOpacity,
                    duration: 300,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: false
                })
            ]).start(onFinished);
        }
    }

    function getSlideAnimation(): ViewStyle
    {
        return {
            opacity: animatedOpacity as unknown as number,
            transform: [{
                translateX: animatedTranslateX as unknown as number
            }]
        };
    }

    function doZoomAnimation(): void
    {
        animatedScale.setValue(scaleRef.current);
        animatedOpacity.setValue(opacityRef.current);

        const nextScale = getScale(transitionStage);
        const nextOpacity = getOpacity(transitionStage);
        if (nextScale !== scaleRef.current && nextOpacity !== opacityRef.current)
        {
            scaleRef.current = nextScale;
            opacityRef.current = nextOpacity;

            Animated.parallel([
                Animated.timing(animatedScale, {
                    toValue: nextScale,
                    duration: 200,
                    delay: transitionStage === Stage.Enter ? 250 : 0,
                    easing: Easing.bezier(0, 0, 0, 1),
                    useNativeDriver: false
                }),
                Animated.timing(animatedOpacity, {
                    toValue: nextOpacity,
                    duration: 200,
                    delay: transitionStage === Stage.Enter ? 250 : 0,
                    easing: Easing.bezier(0, 0, 0, 1),
                    useNativeDriver: false
                })
            ]).start(onFinished);
        }
    }

    function getZoomAnimation(): ViewStyle
    {
        return {
            opacity: animatedOpacity as unknown as number,
            transform: [{
                scale: animatedScale as unknown as number
            }]
        };
    }

    function getAnimation(): ViewStyle
    {
        switch (transitionContext.props.settings.animation)
        {
            case Animation.Slide:
                return getSlideAnimation();

            case Animation.Zoom:
                return getZoomAnimation();

            case Animation.None:
            default:
                return {};
        }
    }
}

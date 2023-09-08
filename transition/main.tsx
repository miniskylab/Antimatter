import {View, ViewStyle} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo, useState} from "react";
import {Transitionable} from "./components";
import {Stage} from "./enums";
import {TransitionAnimationHook, TransitionContextHook} from "./hooks";
import {TransitionContext, TransitionProps, TransitionState} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Transition({
    style,
    settings,
    children
}: TransitionProps): JSX.Element
{
    const props: Required<TransitionProps> = {
        style, settings, children
    };

    const [state, setState] = useState<TransitionState>({
        children: {}
    });

    const context = useMemo<TransitionContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle, state);
    const transitionableStyle: Transitionable.Style = function (transitionableProps: Transitionable.Props): ViewStyle
    {
        const transitionContext = TransitionContextHook.useTransitionContext();

        const isActiveTransitionable = transitionableProps.id === transitionContext.props.children.key;
        const transitionStage = isActiveTransitionable ? Stage.Enter : Stage.Exit;

        return () => ({
            position: "absolute",
            width: "100%",
            height: "100%",
            ...TransitionAnimationHook.useAnimation(transitionStage, onTransitionFinished)
        });

        function onTransitionFinished()
        {
            if (!isActiveTransitionable)
            {
                transitionableProps?.onReadyToUnmount(transitionableProps.id);
            }
        }
    };

    if (!Object.values(state.children).some(x => x === children))
    {
        setState(prevState => ({
            ...prevState,
            children: {
                ...prevState.children,
                [children.key]: children
            }
        }));
    }

    return (
        <TransitionContext.Provider value={context}>
            <View style={computedStyle}>
                {Object.values(state.children).map(child => (
                    <Transitionable.Component
                        key={child.key}
                        id={`${child.key}`}
                        style={transitionableStyle}
                        onReadyToUnmount={onTransitionableIsReadyToUnmount}
                    >
                        {child}
                    </Transitionable.Component>
                ))}
            </View>
        </TransitionContext.Provider>
    );

    function onTransitionableIsReadyToUnmount(transitionableId: string): void
    {
        setState(prevState => ({
            ...prevState,
            children: Object.fromEntries(
                Object.entries(prevState.children).filter(x => x[0] !== transitionableId)
            )
        }));
    }
}
